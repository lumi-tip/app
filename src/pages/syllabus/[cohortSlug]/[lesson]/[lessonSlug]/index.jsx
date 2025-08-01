import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Box, Flex, useDisclosure, Link, Avatar,
  useColorModeValue, Modal, ModalOverlay, Tooltip,
  ModalContent, ModalCloseButton, ModalBody, Button,
} from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { isWindow, assetTypeValues, getExtensionName, getStorageItem, languageFix, addQueryToURL } from '../../../../../utils';
import asPrivate from '../../../../../context/PrivateRouteWrapper';
import Heading from '../../../../../components/Heading';
import useModuleHandler from '../../../../../hooks/useModuleHandler';
import AssignmentButton from '../../../../../components/AssignmentButton';
import getMarkDownContent from '../../../../../components/MarkDownParser/markdown';
import MarkDownParser from '../../../../../components/MarkDownParser';
import Text from '../../../../../components/Text';
import useAuth from '../../../../../hooks/useAuth';
import useRigo from '../../../../../hooks/useRigo';
import StickySideBar from '../../../../../components/StickySideBar';
import Icon from '../../../../../components/Icon';
import ShareButton from '../../../../../components/ShareButton';
import ModalInfo from '../../../../../components/ModalInfo';
import ReactPlayerV2 from '../../../../../components/ReactPlayerV2';
import ScrollTop from '../../../../../components/scrollTop';
import TimelineSidebar from '../../../../../components/GuidedExperience/TimelineSidebar';
import GuidedExperienceSidebar from '../../../../../components/GuidedExperience/GuidedExperienceSidebar';
import ExerciseGuidedExperience from '../../../../../components/GuidedExperience/ExerciseGuidedExperience';
import ProjectBoardGuidedExperience from '../../../../../components/GuidedExperience/ProjectBoardGuidedExperience';
import SyllabusMarkdownComponent from '../../../../../components/GuidedExperience/SyllabusMarkdownComponent';
import Topbar from '../../../../../components/GuidedExperience/Topbar';
import bc from '../../../../../services/breathecode';
import useCohortHandler from '../../../../../hooks/useCohortHandler';
import useSubscriptions from '../../../../../hooks/useSubscriptions';
import SimpleModal from '../../../../../components/SimpleModal';
import ReactSelect from '../../../../../components/ReactSelect';
import ConnectGithubRigobot from '../../../../../components/ConnectGithubRigobot';
import useStyle from '../../../../../hooks/useStyle';
import { ORIGIN_HOST, BREATHECODE_HOST } from '../../../../../utils/variables';
import { log } from '../../../../../utils/logging';
import completions from './completion-jobs.json';
import { generateUserContext } from '../../../../../utils/rigobotContext';
import SubTasks from '../../../../../components/MarkDownParser/SubTasks';
import useCustomToast from '../../../../../hooks/useCustomToast';
import ReviewModal from '../../../../../components/ReviewModal';
import VideoModal from '../../../../../components/VideoModal';
import useSocialShare from '../../../../../hooks/useSocialShare';

function SyllabusContent() {
  const { t, lang } = useTranslation('syllabus');
  const router = useRouter();
  const { createToast } = useCustomToast({ toastId: 'ai-chat-access-error' });

  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });
  const { user, isLoading, isAuthenticatedWithRigobot } = useAuth();
  const { rigo, isRigoInitialized } = useRigo();
  const {
    setCurrentTask,
    currentTask,
    nextModule,
    setNextModule,
    prevModule,
    setPrevModule,
    setSubTasks,
    subTasks,
  } = useModuleHandler();
  const mainContainer = useRef(null);
  const [openNextPageModal, setOpenNextPageModal] = useState(false);
  const [readme, setReadme] = useState(null);
  const [ipynbHtmlUrl, setIpynbHtmlUrl] = useState(null);
  const [extendedInstructions, setExtendedInstructions] = useState(null);
  const [extendedIsEnabled, setExtendedIsEnabled] = useState(false);
  const [showPendingTasks, setShowPendingTasks] = useState(false);
  const [currentSelectedModule, setCurrentSelectedModule] = useState(null);
  const [openNextModuleModal, setOpenNextModuleModal] = useState(false);
  const [quizSlug, setQuizSlug] = useState(null);
  const [showSolutionVideo, setShowSolutionVideo] = useState(false);
  const [selectedSyllabus, setSelectedSyllabus] = useState({});
  const [defaultSelectedSyllabus, setDefaultSelectedSyllabus] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showRigobotModal, setShowRigobotModal] = useState(false);
  const [readmeUrlPathname, setReadmeUrlPathname] = useState(null);
  const [openTargetBlankModal, setOpenTargetBlankModal] = useState(null);
  const [currentBlankProps, setCurrentBlankProps] = useState(null);
  const [clickedPage, setClickedPage] = useState({});
  const [currentAsset, setCurrentAsset] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');
  const [videoModalTitle, setVideoModalTitle] = useState('');
  const [learnpackStart, setLearnpackStart] = useState(false);
  const [showTeachAlert, setShowTeachAlert] = useState(false);
  const [alertedModuleId, setAlertedModuleId] = useState(null);
  const {
    getCohortUserCapabilities, getCohortData, cohortSession, sortedAssignments, setCohortSession, taskTodo,
    updateAssignment, startDay, updateTask, reviewModalState, handleCloseReviewModal,
    grantAccess, setGrantAccess, checkNavigationAvailability, checkRevisionStatus,
  } = useCohortHandler();
  const { areSubscriptionsFetched } = useSubscriptions();
  const allowContributions = currentAsset?.allow_contributions;
  const isAvailableAsSaas = cohortSession?.available_as_saas;

  const introButtonRef = useRef(null);
  const solutionButtonRef = useRef(null);
  const controlsContainerRef = useRef(null);

  const { featuredLight, fontColor, borderColor, backgroundColor, hexColor, featuredColor, colorMode } = useStyle();

  const hasSubtasks = subTasks?.length > 0;
  const hasPendingSubtasks = hasSubtasks && subTasks.some((subtask) => subtask.status === 'PENDING');

  const professionalRoles = ['TEACHER', 'ASSISTANT', 'REVIEWER'];
  const accessToken = isWindow ? localStorage.getItem('accessToken') : '';

  const commonBorderColor = useColorModeValue('gray.200', 'gray.500');
  const taskBarBackground = useColorModeValue('#DCE9FF', 'gray.dark');

  const { label, teacherInstructions, keyConcepts } = selectedSyllabus;

  const firstTask = nextModule?.content[0];
  const lastPrevTask = prevModule?.content && prevModule.content[prevModule.content.length - 1];

  const { cohortSlug, lesson, lessonSlug } = router.query;

  const language = router.locale === 'en' ? 'us' : router.locale;

  const isQuiz = lesson === 'answer';
  const isExercise = lesson === 'practice';
  const isProject = lesson === 'project';
  const isLesson = lesson === 'read';

  const filteredCurrentAssignments = sortedAssignments.map((section) => (showPendingTasks
    ? section.filteredContentByPending
    : section.filteredContent));

  const currentModuleIndex = filteredCurrentAssignments.findIndex((s) => s?.some((l) => l.slug === lessonSlug || l.translations?.[language]?.slug === lessonSlug || (currentAsset?.id && l.translations?.[language]?.slug === currentAsset.slug)));

  const currentModule = sortedAssignments[currentModuleIndex];

  const buildLearnpackUrl = () => {
    const learnpackDeployUrl = currentAsset?.learnpack_deploy_url;
    if (!learnpackDeployUrl) return null;

    const iframe = 'true';
    const token = getStorageItem('accessToken');
    const cohortId = cohortSession?.id;
    const academyId = cohortSession?.academy?.id;

    return `${learnpackDeployUrl}#language=${language}&lang=${language}&theme=${colorMode}&iframe=${iframe}&token=${token}&cohort=${cohortId}&academy=${academyId}`;
  };
  const iframeURL = useMemo(() => buildLearnpackUrl(), [colorMode, currentAsset, lang]);

  const handleStartLearnpack = () => {
    setLearnpackStart(true);
    onToggle();
  };

  useEffect(() => {
    setLearnpackStart(false);
    if (currentAsset?.superseded_by?.slug) {
      createToast({
        title: t('superseded-message'),
        description: (
          <Text size="15px" letterSpacing="0.05em" style={{ margin: '0' }}>
            {t('superseded-message')}
            {' '}
            <Link fontSize="15px" textDecoration="underline" href={`/${lang}/syllabus/${cohortSlug}/${lesson}/${currentAsset.superseded_by.slug}`}>
              {currentAsset.superseded_by.title}
            </Link>
          </Text>
        ),
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [currentAsset]);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollMainContainerTop = () => {
    if (mainContainer?.current) {
      mainContainer.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  const handleStartDay = async (module = null, avoidRedirect = false) => {
    const moduleToUpdate = module?.content || nextModule.content;
    const updatedTasks = moduleToUpdate?.map((l) => ({
      ...l,
      associated_slug: l.slug,
      cohort: cohortSession.id,
    }));
    const customHandler = () => {
      if (moduleToUpdate && cohortSlug && firstTask && !avoidRedirect) {
        router.push(`/syllabus/${cohortSlug}/${firstTask?.type?.toLowerCase()}/${firstTask?.slug}`);
      }
    };
    if (user?.id) {
      await startDay({
        cohort: cohortSession,
        newTasks: updatedTasks,
        customHandler,
      });
    }
  };

  const setCohortAndAssignments = async () => {
    const cohort = await getCohortData({
      cohortSlug,
    });
    getCohortUserCapabilities({
      cohort,
    });
  };

  useEffect(() => {
    if (!isLoading) {
      setCohortAndAssignments();
    }
  }, [isLoading]);

  const updateOpenedAt = async () => {
    try {
      const result = await bc.assignments().updateTask({ id: currentTask.id, opened_at: new Date() });
      if (result.data) {
        const updateTasks = taskTodo.map((task) => ({ ...task }));
        const index = updateTasks.findIndex((el) => el.task_type === assetTypeValues[lesson] && el.associated_slug === lessonSlug);
        const updatedTask = {
          ...updateTasks[index],
          opened_at: result.data.opened_at,
        };
        updateTask(updatedTask, cohortSession);
      }
    } catch (e) {
      log('update_task_error:', e);
    }
  };

  const processAiContext = (aiContext, cohort) => {
    if (!aiContext) return '';

    let processedContext = aiContext.replace(/<!--\s*hide\s*-->[\s\S]*?<!--\s*endhide\s*-->/g, '');

    processedContext = processedContext.replace(/<onlyfor\s+saas="(true|false)".*?>([\s\S]*?)<\/onlyfor>/gi, (match, saasValue, content) => {
      const isCohortSaas = cohort?.available_as_saas === true;

      if ((saasValue === 'false' && isCohortSaas) || (saasValue === 'true' && !isCohortSaas)) {
        return '';
      }
      return content;
    });

    return processedContext;
  };

  const getAssetContext = async () => {
    try {
      let aiContext;
      const cachedContext = JSON.parse(sessionStorage.getItem(`context-${currentAsset.slug}`));
      if (!cachedContext && currentAsset?.id) {
        const resp = await bc.registry().getAssetContext(currentAsset.id);
        if (resp?.status === 200) {
          aiContext = resp.data;
          sessionStorage.setItem(`context-${currentAsset.slug}`, JSON.stringify(aiContext));
        }
      } else aiContext = cachedContext;

      if (aiContext) {
        const userContext = generateUserContext(user);
        rigo.updateOptions({
          showBubble: false,
          context: `${userContext ? `Here is some information about this user: ${userContext}. \n` : ''}${processAiContext(aiContext.ai_context, cohortSession)}`,
          completions,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (currentTask && !currentTask.opened_at) {
      updateOpenedAt();
    }
    if (currentTask) {
      checkRevisionStatus(currentTask);
    }
  }, [currentTask]);

  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return () => {
      setCohortSession(null);
    };
  }, []);

  useEffect(() => {
    const translations = currentAsset?.translations
      ? Object.values(currentAsset.translations)
      : [];

    if (taskTodo.length > 0) {
      const foundTask = taskTodo.find((el) => (
        el.task_type === assetTypeValues[lesson]
        && (translations.includes(el.associated_slug) || currentAsset?.aliases?.includes(el.associated_slug))
      ));
      setCurrentTask(foundTask);
    }
  }, [taskTodo, lessonSlug, lesson, currentAsset]);

  useEffect(() => {
    if (currentAsset && isRigoInitialized) {
      getAssetContext();
    }
  }, [currentAsset, isRigoInitialized]);

  useEffect(() => {
    if (areSubscriptionsFetched && cohortSession && cohortSession.available_as_saas === true && cohortSession.cohort_user.role === 'STUDENT') {
      checkNavigationAvailability();

      setGrantAccess(true);
    }
    if (cohortSession?.cohort_user?.role !== 'STUDENT' || cohortSession?.available_as_saas === false) setGrantAccess(true);
  }, [cohortSession, areSubscriptionsFetched]);

  const sendProject = async ({ task, githubUrl, taskStatus, flags, showShareModal = true }) => {
    if (showShareModal) setShowModal(true);
    await updateAssignment({
      task, githubUrl, taskStatus, flags,
    });
  };

  const cleanCurrentData = () => {
    setShowModal(false);
    setCurrentAsset(null);
    setCurrentSelectedModule(null);
    setReadme(null);
    setIpynbHtmlUrl(null);
    setCurrentBlankProps(null);
    setSubTasks([]);
  };

  const restoreCurrentState = () => {
    setShowModal(false);
    setOpenNextModuleModal(false);
    setOpenNextPageModal(false);
    setOpenTargetBlankModal(false);
  };

  const onClickAssignment = (e, item) => {
    router.push({
      query: {
        ...router.query,
        lesson: item.type?.toLowerCase(),
        lessonSlug: item?.slug,
      },
    });
    cleanCurrentData();
  };

  const handleNotFound = (task) => {
    if (task?.target === 'blank' && task?.task_type === 'LESSON') {
      setReadme({
        content: t('external-read', { link: task.url }),
      });
      setCurrentAsset({
        title: task.title || t('no-content-found'),
      });
      return;
    }
    setReadme({
      content: t('no-content-found-description'),
    });
    setCurrentAsset({
      title: t('no-content-found'),
    });
  };

  useEffect(() => {
    const currTask = sortedAssignments[currentModuleIndex]?.content?.find((l) => l.slug === lessonSlug);
    const currentLanguageTaskSlug = currTask?.translations?.[language]?.slug || lessonSlug;
    if (cohortSession && sortedAssignments.length > 0) {
      if (currTask?.task_type === 'LESSON' && currTask?.target === 'blank') {
        handleNotFound(currTask);
        return undefined;
      }
      bc.registry({ asset_type: assetTypeValues[lesson] }).getAsset(currentLanguageTaskSlug).then(({ data }) => {
        const translations = data?.translations;
        const exensionName = getExtensionName(data.readme_url);
        const isIpynb = exensionName === 'ipynb';
        const currentSlug = translations?.[language] || lessonSlug;
        const urlPathname = data.readme_url ? data.readme_url.split('https://github.com')[1] : null;
        const pathnameWithoutExtension = urlPathname ? urlPathname.split('.ipynb')[0] : null;
        const extension = urlPathname ? urlPathname.split('.').pop() : null;
        const finalPathname = `${pathnameWithoutExtension}.${extension}`;

        setReadmeUrlPathname(finalPathname);
        let currentTranslationSlug = data?.lang === language ? data.slug : data.translations[language];
        if (isIpynb) {
          setIpynbHtmlUrl(`${BREATHECODE_HOST}/v1/registry/asset/preview/${currentSlug}?plain=true`);
          setCurrentAsset(data);
        } else {
          setIpynbHtmlUrl(null);
          if (currentTranslationSlug === undefined) {
            currentTranslationSlug = `${lessonSlug}-${language}`;
          }

          const avoidReadmeRequest = assetTypeValues[lesson] === 'QUIZ' || (isExercise && isAvailableAsSaas);

          Promise.all([
            avoidReadmeRequest ? false : bc.registry().getAssetReadme(currentTranslationSlug),
            bc.registry({ asset_type: assetTypeValues[lesson] }).getAsset(currentTranslationSlug),
          ])
            .then(([respMarkdown, respData]) => {
              const currData = respData.data;
              const markdownData = respMarkdown.data;

              if (lesson === 'answer') {
                setQuizSlug(currentTranslationSlug);
              } else {
                setQuizSlug(null);
              }
              if (currData !== undefined && typeof markdownData === 'string') {
                // Binary base64 decoding ⇢ UTF-8
                const markdown = getMarkDownContent(markdownData);
                setReadme(markdown);
                setCurrentAsset(currData);
              }
              if (!respMarkdown) setCurrentAsset(currData);
            })
            .catch(() => {
              setReadme({
                content: t('no-traduction-found-description'),
              });
              setCurrentAsset({
                ...data,
                title: data.title || t('no-traduction-found'),
              });
            });
        }
      }).catch(() => {
        handleNotFound(currTask);
      });
    }
    return () => {
      cleanCurrentData();
    };
  }, [router, lessonSlug, cohortSession, sortedAssignments.length]);

  useEffect(() => {
    const currentSyllabus = sortedAssignments.find((l) => l.id === currentSelectedModule);
    const currModuleIndex = sortedAssignments.findIndex(
      (l) => l.content.some((m) => m.slug === lessonSlug),
    );
    const nextModuleData = sortedAssignments[currModuleIndex + 1];
    const prevModuleData = sortedAssignments[currModuleIndex - 1];

    const defaultSyllabus = sortedAssignments.find(
      (l) => l.content.find((m) => m.slug === lessonSlug),
    );

    if (defaultSyllabus) {
      setSelectedSyllabus(currentSyllabus || defaultSyllabus);
      setNextModule(nextModuleData);
      setPrevModule(prevModuleData);
      setDefaultSelectedSyllabus(defaultSyllabus);
    }
  }, [sortedAssignments, lessonSlug, currentSelectedModule]);

  useEffect(() => {
    if (selectedSyllabus.extendedInstructions) {
      const content = selectedSyllabus.extendedInstructions;
      const markdown = getMarkDownContent(content);
      setExtendedInstructions(markdown);
    }
  }, [selectedSyllabus]);

  const teacherActions = professionalRoles.includes(cohortSession?.cohort_user?.role)
    ? [
      {
        icon: 'key',
        slug: 'key-concepts',
        title: t('teacherSidebar.key-concepts'),
        content: keyConcepts?.length > 0 ? keyConcepts : null,
        id: 2,
      },
    ] : [];

  const videoTutorial = currentAsset?.solution_video_url ? [{
    icon: 'youtube',
    slug: 'video-player',
    title: 'Video tutorial',
    content: true,
    actionHandler: () => setShowSolutionVideo(!showSolutionVideo),
    id: 3,
  }] : [];

  const previousAssignment = filteredCurrentAssignments.map((section) => {
    const currentIndex = section.findIndex((l) => l.slug === lessonSlug);
    const prevIndex = currentIndex - 1;

    if (prevIndex >= 0) {
      return section[prevIndex];
    }

    return null;
  })[currentModuleIndex];

  const nextAssignment = filteredCurrentAssignments.map((section) => {
    const currentIndex = section.findIndex((l) => l.slug === lessonSlug);
    const nextIndex = currentIndex + 1;

    if (nextIndex < section.length) {
      return section[nextIndex];
    }
    return null;
  })[currentModuleIndex];

  const handleNextPage = (shouldCleanData = true) => {
    if (shouldCleanData) {
      cleanCurrentData();
    }
    scrollMainContainerTop();
    if (nextAssignment !== null) {
      if (nextAssignment?.target === 'blank') {
        setCurrentBlankProps(nextAssignment);
        router.push({
          query: {
            ...router.query,
            cohortSlug,
            lesson: nextAssignment?.type?.toLowerCase(),
            lessonSlug: nextAssignment?.slug,
          },
        });
      } else {
        setCurrentBlankProps(null);
        router.push({
          query: {
            ...router.query,
            cohortSlug,
            lesson: nextAssignment?.type?.toLowerCase(),
            lessonSlug: nextAssignment?.slug,
          },
        });
      }
    } else if (nextModule) {
      if (firstTask.target !== 'blank') {
        if (cohortSlug && !!firstTask && nextModule?.filteredContent[0]) {
          router.push({
            query: {
              ...router.query,
              cohortSlug,
              lesson: firstTask?.type?.toLowerCase(),
              lessonSlug: firstTask?.slug,
            },
          });
        } else {
          setOpenNextModuleModal(true);
        }
      } else {
        router.push({
          query: {
            ...router.query,
            cohortSlug,
            lesson: firstTask?.type?.toLowerCase(),
            lessonSlug: firstTask?.slug,
          },
        });
        setCurrentBlankProps(firstTask);
      }
    }
  };

  const handlePrevPage = () => {
    cleanCurrentData();
    scrollMainContainerTop();
    if (previousAssignment !== null) {
      if (previousAssignment?.target === 'blank') {
        setCurrentBlankProps(previousAssignment);
        router.push({
          query: {
            ...router.query,
            cohortSlug,
            lesson: previousAssignment?.type?.toLowerCase(),
            lessonSlug: previousAssignment?.slug,
          },
        });
      } else {
        setCurrentBlankProps(null);
        router.push({
          query: {
            ...router.query,
            cohortSlug,
            lesson: previousAssignment?.type?.toLowerCase(),
            lessonSlug: previousAssignment?.slug,
          },
        });
      }
    } else if (prevModule) {
      if (lastPrevTask.target !== 'blank') {
        if (cohortSlug && !!lastPrevTask) {
          router.push({
            query: {
              ...router.query,
              cohortSlug,
              lesson: lastPrevTask?.type?.toLowerCase(),
              lessonSlug: lastPrevTask?.slug,
            },
          });
        }
      } else {
        setCurrentBlankProps(lastPrevTask);
        setCurrentAsset(lastPrevTask);
        router.push({
          query: {
            ...router.query,
            cohortSlug,
            lesson: lastPrevTask?.type?.toLowerCase(),
            lessonSlug: lastPrevTask?.slug,
          },
        });
      }
    }
  };

  const checkAndUpdateModule = async (module) => {
    if (!module || !user?.id) return false;

    const hasNewActivities = module?.content?.length > (module?.filteredContent?.length || 0);
    if (hasNewActivities) {
      const moduleToUpdate = module?.content;
      const updatedTasks = moduleToUpdate?.map((l) => ({
        ...l,
        associated_slug: l.slug,
        cohort: cohortSession.id,
      }));

      await startDay({
        cohort: cohortSession,
        newTasks: updatedTasks,
      });
      return true;
    }
    return false;
  };

  const nextPage = async () => {
    if (currentTask && currentTask.task_status !== 'DONE') {
      setOpenNextPageModal(true);
    } else if (nextAssignment !== null || !!firstTask) {
      setClickedPage(nextAssignment);
      // Determinar qué módulo verificar basado en la posición actual
      const moduleToCheck = !nextAssignment && firstTask ? nextModule : sortedAssignments[currentModuleIndex];
      await checkAndUpdateModule(moduleToCheck);

      if (nextAssignment?.target === 'blank') {
        setCurrentBlankProps(nextAssignment);
        router.push({
          query: {
            ...router.query,
            cohortSlug,
            lesson: nextAssignment?.type?.toLowerCase(),
            lessonSlug: nextAssignment?.slug,
          },
        });
      } else {
        setCurrentBlankProps(null);
        handleNextPage(false);
      }
    } else {
      setOpenNextModuleModal(true);
    }
  };

  const { socials, shareLink } = useSocialShare({
    info: currentTask,
    shareMessage: t('dashboard:share-message', { title: currentTask?.title }),
  });
  const prevPage = async () => {
    setClickedPage(previousAssignment);

    // Determinar qué módulo verificar basado en la posición actual
    const moduleToCheck = !previousAssignment && lastPrevTask ? prevModule : sortedAssignments[currentModuleIndex];
    await checkAndUpdateModule(moduleToCheck);

    if (previousAssignment?.target === 'blank') {
      setCurrentBlankProps(previousAssignment);
      router.push({
        query: {
          ...router.query,
          cohortSlug,
          lesson: previousAssignment?.type?.toLowerCase(),
          lessonSlug: previousAssignment?.slug,
        },
      });
    } else {
      handlePrevPage();
    }
  };

  const handleMarkLater = async () => {
    const moduleToCheck = !nextAssignment && firstTask ? nextModule : sortedAssignments[currentModuleIndex];
    await checkAndUpdateModule(moduleToCheck);
    handleNextPage(false);
    setOpenNextPageModal(false);
  };

  const url = currentAsset?.readme_url || currentAsset?.url;
  const repoUrl = (ipynbHtmlUrl && url) ? `${url.replace('.inpynb', `${router.locale === 'en' ? '' : `.${router.locale}`}.inpynb`)}` : url;
  const inputModalLink = currentBlankProps && currentBlankProps.target === 'blank' ? currentBlankProps.url : `${ORIGIN_HOST}/syllabus/${cohortSlug}/${nextAssignment?.type?.toLowerCase()}/${nextAssignment?.slug}`;

  const cohortModule = sortedAssignments.find((module) => module?.id === cohortSession?.current_module);

  const projectStyles = {
    DONE: {
      borderRadius: currentAsset?.delivery_formats !== 'no_delivery' ? '11px' : '0 0 11px 11px',
      pt: '2rem !important',
    },
    PENDING: {
      borderRadius: '0 0 11px 11px',
      pt: '3rem !important',
    },
  };

  const assetTypeStyles = {
    answer: { padding: '0px', height: '100%', mb: '0px' },
    read: { borderRadius: '0 0 11px 11px', paddingTop: '20px !important' },
    practice: {},
    project: { ...projectStyles[currentTask?.task_status] },
  };

  const getStyles = () => {
    if (!isAvailableAsSaas) return {};

    return {
      padding: { base: '0px 10px 0 10px', md: '0px 2rem 0 2rem' },
      ...assetTypeStyles[lesson],
    };
  };

  const openRigobot = async () => {
    try {
      if (isAuthenticatedWithRigobot) {
        rigo.updateOptions({
          showBubble: false,
          target: '#rigo-chat',
          welcomeMessage: t('rigo-chat.welcome-message', { firstName: user?.first_name, lessonName: currentAsset?.title }),
          highlight: true,
          collapsed: false,
          purposeSlug: '4geekscom-public-agent',
        });
      } else setShowRigobotModal(true);
    } catch (e) {
      console.log(e);
      createToast({
        position: 'top',
        title: t('alert-message:error-ai-chat'),
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const getOverflowY = () => {
    if (isQuiz) return 'hidden';
    if (isAvailableAsSaas && !learnpackStart) return 'scroll';
    return 'auto';
  };

  const handleNavigateToLastPendingSubtask = () => {
    const pendingSubtasks = subTasks.filter((task) => task.status === 'PENDING');

    let highestElement = null;
    let highestOffsetTop = Infinity;

    const pendingSubtasksPositions = pendingSubtasks.map((task) => task.position);
    const checkboxes = Array.from(document.querySelectorAll('input[type="checkbox"]'));
    const pendingCheckboxes = checkboxes.filter((_, index) => pendingSubtasksPositions.includes(index));

    pendingCheckboxes.forEach((checkbox) => {
      if (checkbox.offsetTop < highestOffsetTop) {
        highestOffsetTop = checkbox.offsetTop;
        highestElement = checkbox;
      }
    });

    if (!highestElement) {
      console.log('No element found in the DOM.');
      return;
    }

    highestElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setOpenNextPageModal(false);
  };

  useEffect(() => {
    if (selectedSyllabus && cohortModule && cohortModule.id !== selectedSyllabus.id && professionalRoles.includes(cohortSession?.cohort_user?.role)) {
      if (alertedModuleId !== selectedSyllabus.id) {
        setShowTeachAlert(true);
        setAlertedModuleId(selectedSyllabus.id);
      }
    } else {
      setShowTeachAlert(false);
    }
  }, [selectedSyllabus, cohortModule]);

  useEffect(() => {
    if (professionalRoles.includes(cohortSession?.cohort_user?.role) && selectedSyllabus && defaultSelectedSyllabus?.id !== selectedSyllabus.id) {
      createToast({
        title: t('teacherSidebar.alert-updated-module-instructions'),
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [selectedSyllabus, defaultSelectedSyllabus]);

  return (
    <>
      <Head>
        <title>{currentAsset?.title || '4Geeks'}</title>
      </Head>
      <Flex className="flex-container" minHeight="93vh" background={isAvailableAsSaas && hexColor.lightColor4} position="relative">
        {!isAvailableAsSaas && (
          <StickySideBar
            top="300px"
            width="auto"
            menu={[
              ...teacherActions,
              ...videoTutorial,
            ]}
          />
        )}

        <ScrollTop />

        {isAvailableAsSaas ? (
          <GuidedExperienceSidebar
            currentModuleIndex={currentModuleIndex}
            onClickAssignment={onClickAssignment}
            isOpen={isOpen}
            onToggle={onToggle}
            handleStartDay={handleStartDay}
            grantSyllabusAccess={grantAccess}
          />
        ) : (
          <TimelineSidebar
            onClickAssignment={onClickAssignment}
            showPendingTasks={showPendingTasks}
            setShowPendingTasks={setShowPendingTasks}
            isOpen={isOpen}
            onToggle={onToggle}
            isStudent={!professionalRoles.includes(cohortSession?.cohort_user?.role)}
            teacherInstructions={{
              existContentToShow: extendedInstructions !== null,
              actionHandler: () => {
                setExtendedIsEnabled(!extendedIsEnabled);
                if (extendedIsEnabled === false) {
                  scrollTop();
                }
              },
              actionState: extendedIsEnabled,
            }}
          />
        )}

        <Box width="100%" minWidth="0" margin="0 auto" height="auto">
          {!isAvailableAsSaas && !isQuiz && currentAsset?.intro_video_url && (
            <ReactPlayerV2
              url={currentAsset?.intro_video_url}
            />
          )}
          <Box
            margin="0 auto 0 auto"
            mt={!isAvailableAsSaas && '25px'}
            padding={{ base: '0px 10px 0 10px', md: '0px 2rem 0 2rem' }}
            width="100%"
            maxWidth="1280px"
          >
            {isAvailableAsSaas && (
              <Box margin="10px 0" display="flex" alignItems="center" justifyContent="space-between">
                <Button
                  size="sm"
                  aria-label={t(isOpen ? 'hide-menu' : 'show-menu')}
                  display="flex"
                  gap="10px"
                  fontSize="12px"
                  fontWeight="500"
                  borderRadius="4px"
                  background={backgroundColor}
                  color={hexColor.blueDefault}
                  onClick={onToggle}
                >
                  <Icon style={isOpen && { transform: 'rotate(180deg)' }} width="12px" height="12px" icon={isOpen ? 'close' : 'list'} />
                  {t(isOpen ? 'hide-menu' : 'show-menu')}
                </Button>
                {!learnpackStart
                  && (
                    <>
                      <Box display="flex" gridGap="3rem">
                        {(previousAssignment || !!prevModule) && (
                          <Button
                            size="sm"
                            color="blue.default"
                            cursor="pointer"
                            fontSize="12px"
                            display="flex"
                            alignItems="center"
                            gridGap="10px"
                            fontWeight="500"
                            borderRadius="4px"
                            background={backgroundColor}
                            onClick={prevPage}
                          >
                            <Icon icon="arrowLeft2" width="18px" height="10px" />
                            {t('previous-page')}
                          </Button>
                        )}

                        {(nextAssignment || !!nextModule) && (
                          <Button
                            size="sm"
                            color="blue.default"
                            cursor="pointer"
                            fontSize="12px"
                            display="flex"
                            alignItems="center"
                            gridGap="10px"
                            fontWeight="500"
                            borderRadius="4px"
                            background={backgroundColor}
                            onClick={nextPage}
                          >
                            {t('next-page')}
                            <Box
                              as="span"
                              display="block"
                              transform="rotate(180deg)"
                            >
                              <Icon icon="arrowLeft2" width="18px" height="10px" />
                            </Box>
                          </Button>
                        )}
                      </Box>
                    </>
                  )}
              </Box>
            )}
            {isExercise && isAvailableAsSaas && currentAsset?.id ? (
              <ExerciseGuidedExperience
                currentTask={currentTask}
                currentAsset={currentAsset}
                handleStartLearnpack={handleStartLearnpack}
                setLearnpackStart={setLearnpackStart}
                iframeURL={iframeURL}
                learnpackStart={learnpackStart}
              />
            ) : (
              <Box
                id="main-container"
                ref={mainContainer}
                className={`horizontal-sroll ${colorMode}`}
                height={isAvailableAsSaas && '80vh'}
                overflowY={getOverflowY()}
                borderRadius="11px 11px 0 0"
                position="relative"
              >
                {isProject && isAvailableAsSaas && currentAsset?.id && !learnpackStart && (
                  <ProjectBoardGuidedExperience currentAsset={currentAsset} handleStartLearnpack={handleStartLearnpack} />
                )}
                {isAvailableAsSaas && isLesson && currentAsset && (
                  <Topbar currentAsset={currentAsset} />
                )}
                {learnpackStart
                  ? (
                    <>
                      <Box overflowY="auto" overflowX="hidden" borderRadius="11px" background="blue.50" height="83vh" mb="30px" display="flex" flexDirection="column" justifyContent="space-between" width="100%">
                        <Button color="black" alignSelf="end" _hover="none" _active="none" background="none" onClick={() => setLearnpackStart(false)}>{t('close-proyect')}</Button>
                        <Box flexGrow={1} width="100%">
                          <iframe
                            title="proyect-frame"
                            key={iframeURL}
                            src={iframeURL}
                            width="100%"
                            height="100%"
                            style={{ border: 'none', display: 'block' }}
                            scrolling="no"
                          />
                        </Box>
                      </Box>
                    </>
                  )
                  : (
                    <>
                      <Box
                        id="markdown-body"
                        className={`markdown-body ${colorMode}`}
                        background={backgroundColor}
                        borderRadius="11px"
                        flexGrow={1}
                        marginLeft={0}
                        padding={!isQuiz && isAvailableAsSaas && { base: '0px 10px 0 10px', md: '0px 2rem 0 2rem' }}
                        transition={isOpen ? 'margin 225ms cubic-bezier(0, 0, 0.2, 1) 0ms' : 'margin 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms'}
                        transitionProperty="margin"
                        transitionDuration={isOpen ? '225ms' : '195ms'}
                        transitionTimingFunction={isOpen ? 'cubic-bezier(0, 0, 0.2, 1)' : 'cubic-bezier(0.4, 0, 0.6, 1)'}
                        transitionDelay="0ms"
                        position="relative"
                        {...getStyles()}
                      >

                        {!isQuiz && currentAsset?.solution_video_url && showSolutionVideo && (
                          <Box padding="1.2rem 2rem 2rem 2rem" borderRadius="3px" background={featuredColor}>
                            <Heading as="h2" size="16">
                              Video Tutorial
                            </Heading>
                            <ReactPlayerV2
                              url={currentAsset?.solution_video_url}
                            />
                          </Box>
                        )}

                        {(!isAvailableAsSaas || ipynbHtmlUrl) && (
                          <Box display={{ base: 'flex', md: 'block' }} margin={{ base: '2rem 0 0 0', md: '0px' }} position={{ base: '', md: 'absolute' }} width={{ base: '100%', md: '172px' }} height="auto" top="0" right="0px" background={featuredLight} borderRadius="4px" color={fontColor} zIndex="9">
                            {repoUrl && !isQuiz && !isAvailableAsSaas && (
                              <Link
                                display="flex"
                                target="_blank"
                                rel="noopener noreferrer"
                                width="100%"
                                gridGap="8px"
                                padding={{ base: '8px 12px', md: '8px' }}
                                background="transparent"
                                href={repoUrl}
                                _hover={{ opacity: 0.7 }}
                                style={{ color: fontColor, textDecoration: 'none' }}
                              >
                                <Icon icon="pencil" color="#A0AEC0" width="20px" height="20px" />
                                {t('edit-page')}
                              </Link>
                            )}

                            {ipynbHtmlUrl && currentAsset?.readme_url && (
                              <Box width={{ base: '1px', md: '100%' }} height={{ base: 'auto', md: '1px' }} background={borderColor} />
                            )}

                            {ipynbHtmlUrl && readmeUrlPathname && (
                              <Link display="flex" target="_blank" rel="noopener noreferrer" width="100%" gridGap="8px" padding={{ base: '8px 12px', md: '8px' }} background="transparent" color="white" href={`https://colab.research.google.com/github${readmeUrlPathname}`} _hover={{ opacity: 0.7 }} style={{ color: fontColor, textDecoration: 'none' }}>
                                <Icon icon="collab" color="#A0AEC0" width="28px" height="28px" />
                                {t('open-google-collab')}
                              </Link>
                            )}
                          </Box>
                        )}
                        {ipynbHtmlUrl && (
                          <iframe
                            id="iframe"
                            src={`${ipynbHtmlUrl}&theme=${colorMode}`}
                            style={{
                              width: '100%',
                              height: '99vh',
                              borderRadius: '14px',
                            }}
                            title="4Geeks IPython Notebook"
                          />
                        )}

                        {isQuiz && quizSlug ? (
                          <Box background={featuredColor} width="100%" height={isAvailableAsSaas ? '100%' : '100vh'} borderRadius="14px">
                            <iframe
                              id="iframe"
                              src={`https://assessment.4geeks.com/asset/${quizSlug}?isAnon=true&token=${accessToken}&academy=${cohortSession?.academy?.id}`}
                              style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: '14px',
                              }}
                              title="Breathecode Quiz"
                            />
                          </Box>
                        ) : (
                          <SyllabusMarkdownComponent
                            ipynbHtmlUrl={ipynbHtmlUrl}
                            readme={readme}
                            currentBlankProps={currentBlankProps}
                            currentData={currentAsset}
                            lesson={lesson}
                            quizSlug={quizSlug}
                            lessonSlug={lessonSlug}
                            currentTask={currentTask}
                            isGuidedExperience={isAvailableAsSaas}
                            grantSyllabusAccess={grantAccess}
                            showTeachAlert={showTeachAlert}
                            cohortModule={sortedAssignments.find((module) => module?.id === cohortSession?.current_module)}
                          />
                        )}
                        {!isQuiz && !isAvailableAsSaas && (
                          <Box
                            margin="2.5rem 0 0 0"
                            padding="1.75rem 0 "
                            borderTop="2px solid"
                            borderColor={commonBorderColor}
                            display="flex"
                            flexDirection={{ base: 'column', md: 'row' }}
                            gridGap="20px"
                            alignItems="center"
                            justifyContent="space-between"
                            width="100%"
                          >
                            <Box display="flex" flexDirection={{ base: 'column', md: 'row' }} gridGap="20px">
                              <AssignmentButton
                                allowText
                                currentTask={currentTask}
                                sendProject={sendProject}
                                currentAssetData={currentAsset}
                              />
                              {currentTask?.task_status === 'DONE' && showModal && (
                                <ShareButton
                                  variant="outline"
                                  title={t('projects:share-certificate.title')}
                                  shareText={t('projects:delivery.share-via', { project: currentTask?.title })}
                                  link={shareLink}
                                  socials={socials}
                                  currentTask={currentTask}
                                  onlyModal
                                  withParty
                                />
                              )}
                            </Box>
                            <Box display="flex" gridGap="3rem">
                              {(previousAssignment || !!prevModule) && (
                                <Box
                                  color="blue.default"
                                  cursor="pointer"
                                  fontSize="15px"
                                  display="flex"
                                  alignItems="center"
                                  gridGap="10px"
                                  letterSpacing="0.05em"
                                  fontWeight="700"
                                  onClick={prevPage}
                                >
                                  <Box
                                    as="span"
                                    display="block"
                                  >
                                    <Icon icon="arrowLeft2" width="18px" height="10px" />
                                  </Box>
                                  {t('previous-page')}
                                </Box>
                              )}

                              {(nextAssignment || !!nextModule) && (
                                <Box
                                  color="blue.default"
                                  cursor="pointer"
                                  fontSize="15px"
                                  display="flex"
                                  alignItems="center"
                                  gridGap="10px"
                                  letterSpacing="0.05em"
                                  fontWeight="700"
                                  onClick={nextPage}
                                >
                                  {t('next-page')}
                                  <Box
                                    as="span"
                                    display="block"
                                    transform="rotate(180deg)"
                                  >
                                    <Icon icon="arrowLeft2" width="18px" height="10px" />
                                  </Box>
                                </Box>
                              )}
                            </Box>
                          </Box>
                        )}
                        {isAvailableAsSaas && (
                          <Box className="controls-panel" bottom="0" height="110px" padding="20px 0" display="flex" justifyContent={{ base: 'center', lg: 'flex-end' }}>
                            <Box ref={controlsContainerRef} bottom="50" position="fixed" width="fit-content" padding="15px" borderRadius="12px" background={taskBarBackground} justifyContent="center" display="flex" gridGap="20px">
                              {isRigoInitialized && (isLesson || isProject) && (
                                <Tooltip label={t('get-help')} placement="top">
                                  <Button
                                    display="flex"
                                    flexDirection="column"
                                    justifyContent="center"
                                    width="40px"
                                    height="40px"
                                    background={backgroundColor}
                                    padding="12px"
                                    borderRadius="full"
                                    variant="default"
                                    onClick={openRigobot}
                                    style={{ color: fontColor, textDecoration: 'none' }}
                                  >
                                    <Icon style={{ margin: 'auto', display: 'block' }} icon="rigobot-avatar-tiny" width="30px" height="30px" />
                                  </Button>
                                </Tooltip>
                              )}
                              {repoUrl && (isLesson || isProject) && allowContributions && (
                                <Tooltip label={t('contribute')} placement="top">
                                  <Link
                                    display="flex"
                                    flexDirection="column"
                                    justifyContent="center"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    width="40px"
                                    height="40px"
                                    background={backgroundColor}
                                    borderRadius="full"
                                    variant="default"
                                    href={repoUrl}
                                    style={{ color: fontColor, textDecoration: 'none' }}
                                  >
                                    <Icon style={{ margin: 'auto', display: 'block' }} icon="github" color={hexColor.blueDefault} width="30px" height="30px" />
                                  </Link>
                                </Tooltip>
                              )}
                              {isLesson && currentAsset?.intro_video_url && (
                                <Tooltip label={t('watch-intro')} placement="top">
                                  <Button
                                    ref={introButtonRef}
                                    display="flex"
                                    flexDirection="column"
                                    justifyContent="center"
                                    width="40px"
                                    height="40px"
                                    background={backgroundColor}
                                    padding="12px"
                                    borderRadius="full"
                                    variant="default"
                                    onClick={() => {
                                      setCurrentVideoUrl(currentAsset?.intro_video_url);
                                      setVideoModalTitle(currentAsset?.title || t('watch-intro'));
                                      setIsVideoModalOpen(true);
                                    }}
                                  >
                                    <Icon style={{ margin: 'auto', display: 'block' }} icon="youtube" width="30px" color={hexColor.blueDefault} height="30px" />
                                  </Button>
                                </Tooltip>
                              )}
                              {currentAsset?.solution_video_url && (
                                <Tooltip label={t('solution-video')} placement="top">
                                  <Button
                                    ref={solutionButtonRef}
                                    display="flex"
                                    flexDirection="column"
                                    justifyContent="center"
                                    width="40px"
                                    height="40px"
                                    background={backgroundColor}
                                    padding="12px"
                                    borderRadius="full"
                                    variant="default"
                                    onClick={() => {
                                      setCurrentVideoUrl(currentAsset?.solution_video_url);
                                      setVideoModalTitle(currentAsset?.title || t('solution-video'));
                                      setIsVideoModalOpen(true);
                                    }}
                                  >
                                    <Icon style={{ margin: 'auto', display: 'block' }} color={hexColor.blueDefault} icon="play" width="30px" height="30px" />
                                  </Button>
                                </Tooltip>
                              )}
                              {!isExercise && (
                                <AssignmentButton
                                  allowText
                                  isGuidedExperience={isAvailableAsSaas}
                                  variant="rounded"
                                  currentTask={currentTask}
                                  sendProject={sendProject}
                                  currentAssetData={currentAsset}
                                />
                              )}
                              {currentTask?.task_status === 'DONE' && showModal && (
                                <ShareButton
                                  variant="outline"
                                  title={t('projects:share-certificate.title')}
                                  shareText={t('projects:delivery.share-via', { project: currentTask?.title })}
                                  link={shareLink}
                                  socials={socials}
                                  currentTask={currentTask}
                                  onlyModal
                                  withParty
                                />
                              )}
                            </Box>
                          </Box>
                        )}
                      </Box>
                    </>
                  )}
              </Box>
            )}
          </Box>
        </Box>
      </Flex>
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl={currentVideoUrl}
        positioningRef={controlsContainerRef}
        title={videoModalTitle}
      />
      <SimpleModal
        size="md"
        isOpen={showRigobotModal}
        onClose={() => setShowRigobotModal(false)}
      >
        <Box display="flex" flexDirection="column" alignItems="center" gridGap="17px" paddingBottom="10px">
          <Avatar src={`${BREATHECODE_HOST}/static/img/avatar-1.png`} border="3px solid" borderColor={hexColor.blueDefault} width="91px" height="91px" borderRadius="50px" />
          <Text
            size="17px"
            textAlign="center"
          >
            {t('connect-rigobot-message')}
          </Text>
          <ConnectGithubRigobot width="100%" />
        </Box>
      </SimpleModal>
      <Modal isOpen={openNextPageModal} size="xl" onClose={() => setOpenNextPageModal(false)}>
        <ModalOverlay />
        <ModalContent style={{ margin: '3rem 0' }}>
          <ModalCloseButton />
          <ModalBody padding={{ base: '26px 18px', md: '42px 36px' }}>
            <Text fontSize="md" textAlign="center" fontWeight="700" mb="10px">{t('wait-a-sec')}</Text>
            {!hasPendingSubtasks && (
              <Heading size="xsm" fontWeight="700" padding={{ base: '0 1rem 26px 1rem', md: '0 4rem 52px 4rem' }} textAlign="center">
                {t('ask-to-done', { taskType: assetTypeValues[lesson]?.toLowerCase() })}
              </Heading>
            )}
            {hasPendingSubtasks && <SubTasks subTasks={subTasks} assetType={currentAsset?.asset_type} marginBottom="30px" />}
            <Box display="flex" flexDirection={{ base: 'column', sm: 'row' }} gridGap="12px" justifyContent="space-between">
              <Button
                variant="outline"
                onClick={handleMarkLater}
                textTransform="uppercase"
                fontSize="13px"
              >
                {t('mark-later')}
              </Button>
              <AssignmentButton
                allowText
                currentTask={currentTask}
                hasPendingSubtasks={hasPendingSubtasks}
                sendProject={sendProject}
                togglePendingSubtasks={handleNavigateToLastPendingSubtask}
                currentAssetData={currentAsset}
                onClickHandler={async () => {
                  const moduleToCheck = !nextAssignment && firstTask ? nextModule : sortedAssignments[currentModuleIndex];
                  await checkAndUpdateModule(moduleToCheck);
                  if (nextAssignment?.target === 'blank') {
                    setTimeout(() => {
                      setCurrentBlankProps(nextAssignment);
                      setOpenTargetBlankModal(true);
                    }, 1200);
                  } else {
                    setTimeout(() => {
                      handleNextPage(false);
                    }, 1200);
                  }
                  setOpenNextPageModal(false);
                }}
              />
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={openNextModuleModal} size="xl" margin="0 10px" onClose={() => setOpenNextModuleModal(false)}>
        <ModalOverlay />
        <ModalContent style={{ margin: '3rem 0' }}>
          <ModalCloseButton />
          <ModalBody padding={{ base: '26px 18px', md: '42px 36px' }}>
            {label && nextModule?.label && (
              <Heading size="xsm" fontWeight="700" padding={{ base: '0 1rem 26px 1rem', md: '0 4rem 52px 4rem' }} textAlign="center">
                {t('reached-the-end-of-the-module', { label: languageFix(label, lang), nextModuleLabel: languageFix(nextModule.label, lang) })}
              </Heading>
            )}
            <Box display="flex" flexDirection={{ base: 'column', sm: 'row' }} gridGap="12px" justifyContent="space-around">
              <Button
                variant="outline"
                onClick={() => {
                  restoreCurrentState();
                }}
                textTransform="uppercase"
                fontSize="13px"
              >
                {t('common:cancel')}
              </Button>
              <Button
                variant="default"
                onClick={async () => {
                  await handleStartDay(null, true);
                  cleanCurrentData();
                  if (cohortSlug && firstTask) {
                    router.push(`/syllabus/${cohortSlug}/${firstTask?.type?.toLowerCase()}/${firstTask?.slug}`);
                  }
                  setOpenNextModuleModal(false);
                }}
                textTransform="uppercase"
                fontSize="13px"
              >
                {t('start-next-module')}
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      <ModalInfo
        isOpen={openTargetBlankModal}
        onClose={() => setOpenTargetBlankModal(false)}
        title={t('dashboard:modules.target-blank-title')}
        isReadonly
        description={t('dashboard:modules.target-blank-msg', { title: clickedPage?.title || currentBlankProps?.title })}
        link={addQueryToURL(inputModalLink, { lang })}
        handlerText={t('common:open')}
        closeText={t('common:close')}
        closeButtonVariant="outline"
        actionHandler={() => {
          setOpenTargetBlankModal(false);
          if (currentBlankProps && currentBlankProps.target === 'blank') {
            window.open(currentBlankProps.url, '_blank');
          }
        }}
      />
      {extendedInstructions !== null && (
        <SimpleModal isOpen={extendedIsEnabled} onClose={() => setExtendedIsEnabled(false)} padding="2rem 0 2rem 0" style={{ margin: '3rem 0' }} size={{ md: '2xl', base: 'xl' }}>
          <Box display="flex" flexDirection={{ base: 'column', md: 'row' }} gridGap={{ base: '0', md: '10px' }} alignItems={{ base: 'start', md: 'center' }}>
            <Heading size="m" style={{ margin: '0' }} padding={{ base: '0', md: '0 0 5px 0 !important' }}>
              {`${t('teacherSidebar.instructions')}:`}
            </Heading>
            {sortedAssignments.length > 0 && (
              <ReactSelect
                unstyled
                color="#0097CD"
                fontWeight="700"
                id="cohort-select"
                fontSize="25px"
                placeholder={t('common:select-cohort')}
                noOptionsMessage={() => t('common:no-options-message')}
                defaultValue={{
                  value: selectedSyllabus?.id || defaultSelectedSyllabus?.id,
                  slug: selectedSyllabus?.slug || defaultSelectedSyllabus?.slug,
                  label: selectedSyllabus?.id
                    ? `#${selectedSyllabus?.id} - ${selectedSyllabus?.label[lang === 'en' ? 'us' : lang] || selectedSyllabus?.label}`
                    : `#${defaultSelectedSyllabus?.id} - ${defaultSelectedSyllabus?.label[lang === 'en' ? 'us' : lang] || defaultSelectedSyllabus?.label}`,
                }}
                onChange={({ value }) => {
                  setCurrentSelectedModule(parseInt(value, 10));
                }}
                options={sortedAssignments.map((module) => ({
                  value: module?.id,
                  slug: module.slug,
                  label: `#${module?.id} - ${module?.label[lang === 'en' ? 'us' : lang] || module?.label}`,
                }))}
              />
            )}
          </Box>

          <Box display="flex" flexDirection="column" background={featuredColor} p="25px" m="18px 0 30px 0" borderRadius="16px" gridGap="18px">
            <Heading as="h2" size="sm" style={{ margin: '0' }}>
              {`${label[lang === 'en' ? 'us' : lang] || label} - `}
              {t('teacherSidebar.module-duration', { duration: selectedSyllabus?.duration_in_days || currentModule?.duration_in_days || 1 })}
            </Heading>
            <Text size="15px" letterSpacing="0.05em" style={{ margin: '0' }}>
              {teacherInstructions}
            </Text>
          </Box>
          <MarkDownParser content={extendedInstructions?.content || ''} />
        </SimpleModal>
      )}
      <ReviewModal
        isOpen={reviewModalState.isOpen}
        onClose={handleCloseReviewModal}
        currentTask={reviewModalState.currentTask}
        fileData={reviewModalState.fileData}
        isStudent
      />
    </>
  );
}

export default asPrivate(SyllabusContent);
