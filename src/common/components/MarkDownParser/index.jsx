/* eslint-disable react/prop-types */
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import React, { useEffect, useState, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkGemoji from 'remark-gemoji';
import PropTypes from 'prop-types';
import rehypeRaw from 'rehype-raw';
import {
  Img,
} from '@chakra-ui/react';
import AnchorJS from 'anchor-js';
import bc from '../../services/breathecode';
import {
  Wrapper, BeforeAfter, Code, MDCheckbox, MDHeading, MDHr, MDLink, MDText, OnlyForBanner, Quote,
} from './MDComponents';
import useModuleHandler from '../../hooks/useModuleHandler';
import CodeViewer, { languagesLabels, languagesNames } from '../CodeViewer';
import DynamicCallToAction from '../DynamicCallToAction';

function MarkdownH2Heading({ children }) {
  return (
    <MDHeading tagType="h2">
      {children}
    </MDHeading>
  );
}
function MarkdownH3Heading({ children }) {
  return (
    <MDHeading tagType="h3">
      {children}
    </MDHeading>
  );
}
function MarkdownH4Heading({ children }) {
  return (
    <MDHeading tagType="h4">
      {children}
    </MDHeading>
  );
}
function UlComponent({ children }) {
  return (<ul className="md-bullet">{children}</ul>);
}
function OlComponent({ children }) {
  return (<ol className="md-bullet">{children}</ol>);
}
function ImgComponent(props) {
  return (<Img className="MDImg" alt={props?.alt} src={props?.src} />);
}
function ParagraphComponent({ children }) {
  return (<MDText>{children}</MDText>);
}
function HrComponent() {
  return (<MDHr />);
}
function IframeComponent({ src, title, width, height }) {
  return (<iframe src={src} width={width} height={height} title={title || 'iframe-content'} className="MDIframe" />);
}
function OnlyForComponent({ ...props }) {
  return (<OnlyForBanner {...props} />);
}

function CodeViewerComponent(props) {
  const { preParsedContent, node, fileContext } = props;
  const nodeStartOffset = node.position.start.offset;
  const nodeEndOffset = node.position.end.offset;

  const input = preParsedContent.substring(nodeStartOffset, nodeEndOffset);
  const regex = /```([a-zA-Z]+)(.*)([\s\S]+?)```/g;
  let match;
  const fragments = [];

  // eslint-disable-next-line no-cond-assign
  while ((match = regex.exec(input)) !== null) {
    const parameters = match[2].split(' ');

    let path = parameters.find((param) => param.includes('path'));
    if (path) {
      const removeQuotes = /"|'|path=/g;
      path = path.replaceAll(removeQuotes, '');
    }
    fragments.push({
      language: languagesNames[match[1].toLowerCase()] || match[1],
      label: languagesLabels[match[1].toLowerCase()] || match[1],
      code: match[3].trim(),
      path,
    });
  }

  return (
    <CodeViewer
      languagesData={fragments}
      margin="10px 0"
      fileContext={fileContext}
    />
  );
}

function MdCallToAction({ assetData }) {
  return (
    <DynamicCallToAction
      assetId={assetData?.id}
      assetTechnologies={assetData?.technologies?.map((item) => item?.slug)}
      assetType={assetData?.asset_type.toLowerCase()}
      placement="bottom"
      marginTop="40px"
    />
  );
}

function ListComponent({ subTasksLoaded, newSubTasks, setNewSubTasks, subTasks, updateSubTask, ...props }) {
  const childrenExists = props?.children?.length >= 0;
  const type = childrenExists && props?.children[0]?.props && props.children[0].props.type;
  const type2 = childrenExists && props?.children[1]?.props && props.children[1]?.props.node?.children[0]?.properties?.type;
  return (type === 'checkbox' || type2 === 'checkbox') ? (
    <MDCheckbox
      className="MDCheckbox"
      {...props}
      subTasksLoaded={subTasksLoaded}
      newSubTasks={newSubTasks}
      setNewSubTasks={setNewSubTasks}
      subTasks={subTasks}
      updateSubTask={updateSubTask}
    />
  ) : (
    <li>{props?.children}</li>
  );
}

function MarkDownParser({
  content, currentTask,
  showLineNumbers, showInlineLineNumbers, assetData,
}) {
  const [subTasksLoaded, setSubTasksLoaded] = useState(false);
  const [newSubTasks, setNewSubTasks] = useState([]);
  const [fileContext, setFileContext] = useState('');
  const { subTasks, setSubTasks } = useModuleHandler();

  const updateSubTask = async (taskProps) => {
    const cleanedSubTasks = subTasks.filter((task) => task.id !== taskProps.id);
    if (currentTask?.id) {
      const resp = await bc.todo().subtask().update(
        currentTask?.id,
        [
          ...cleanedSubTasks,
          taskProps,
        ],
      );
      if (resp.status >= 200 && resp.status < 400) {
        const respData = await resp.data;
        setSubTasks(respData);
      }
    }
  };

  const fetchSubtasks = async () => {
    try {
      const { data } = await bc.todo().subtask().get(currentTask?.id);

      if (Array.isArray(data)) setSubTasks(data);
      setSubTasksLoaded(true);
    } catch (e) {
      console.log(e);
    }
  };

  // Prefetch subtasks
  useEffect(() => {
    if (currentTask?.id) {
      fetchSubtasks();
    }
  }, [currentTask]);

  const createSubTasksIfNotExists = async () => {
    // const cleanedSubTasks = subTasks.filter((task) => task.id !== currentTask.id);
    if (currentTask?.id && newSubTasks.length > 0) {
      const resp = await bc.todo().subtask().update(
        currentTask?.id,
        [
          // ...cleanedSubTasks,
          ...newSubTasks,
        ],
      );
      if (resp.status >= 200 && resp.status < 400) {
        const respData = await resp.data;
        setSubTasks(respData);
      }
    }
  };

  // Create subTasks if not exists
  useEffect(() => {
    if (subTasksLoaded && subTasks.length === 0) {
      createSubTasksIfNotExists();
    }
  }, [subTasksLoaded, subTasks, newSubTasks]);

  // const newLineBeforeCloseTag = /<\//gm;

  // const formatedContent = content.replace(newLineBeforeCloseTag, '\n$&');

  useEffect(() => {
    // initialize anchorJS when markdown content has mounted to the DOM
    const anchors = new AnchorJS();
    anchors.options = {
      placement: 'left',
      icon: '',
    };
    anchors.add('.markdown-body h1');
    anchors.add('.markdown-body h2');
    anchors.add('.markdown-body h3');
    anchors.add('.markdown-body p');
    anchors.add('.markdown-body pre');
  }, [content]);

  const preParsedContent = useMemo(() => {
    //This regex is to remove the runable empty codeblocks
    const emptyCodeRegex = /```([a-zA-Z]+).*runable=("true"|true|'true').*(\n{1,}|\s{1,}\n{1,})?```/gm;
    //This regex is to wrap all the runable codeblocks inside of a <codeviewer> tag
    const codeViewerRegex = /(```(?<language>[\w.]+).*runable=("true"|'true'|true).*(?<code>(?:.|\n)*?)```\n?)+/gm;

    const removedEmptyCodeViewers = content?.length > 0 ? content.replace(emptyCodeRegex, () => '') : '';

    const contentReplace = removedEmptyCodeViewers.replace(codeViewerRegex, (match) => `<pre><codeviewer>\n${match}</codeviewer></pre>\n`);

    const contextPathRegex = /```([a-zA-Z]+).*(path=[^\s]*).*([\s\S]+?)```/g;

    let fileMatch;
    // eslint-disable-next-line no-cond-assign
    while ((fileMatch = contextPathRegex.exec(contentReplace)) !== null) {
      const filePath = fileMatch[2].trim().replaceAll(/"|'|path=/g, '');
      const contentFile = fileMatch[3].trim();

      setFileContext((file) => `${file}File path: ${filePath}\nFile content:\n${contentFile}\n\n`);
    }

    return contentReplace;
  }, [content]);

  return (
    <>
      <ReactMarkdown
      // gemoji plugin
        remarkPlugins={[remarkGfm, remarkGemoji, remarkMath]}
        rehypePlugins={[rehypeRaw, rehypeKatex]}
        components={{
          div: Wrapper,
          a: MDLink,
          code: ({ ...props }) => Code({ ...props, showLineNumbers, showInlineLineNumbers }),
          h1: MarkdownH2Heading,
          h2: MarkdownH2Heading,
          h3: MarkdownH3Heading,
          h4: MarkdownH4Heading,
          ul: UlComponent,
          ol: OlComponent,
          img: ImgComponent,
          p: ParagraphComponent,
          hr: HrComponent,
          BeforeAfter,
          'before-after': BeforeAfter,
          iframe: IframeComponent,
          // table: {
          //   component: MDTable,
          // },
          onlyfor: ({ ...props }) => OnlyForComponent({ ...props }),
          codeviewer: ({ ...props }) => CodeViewerComponent({ ...props, preParsedContent, fileContext }),
          calltoaction: ({ ...props }) => MdCallToAction({ ...props, assetData }),
          // Component for list of checkbox
          // children[1].props.node.children[0].properties.type
          li: ({ ...props }) => ListComponent({ subTasksLoaded, newSubTasks, setNewSubTasks, subTasks, updateSubTask, ...props }),
          quote: Quote,
        }}
      >
        {preParsedContent}
      </ReactMarkdown>
    </>
  );
}

MarkDownParser.propTypes = {
  content: PropTypes.string,
  currentTask: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array])),
  showLineNumbers: PropTypes.bool,
  showInlineLineNumbers: PropTypes.bool,
  assetData: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.object])),
};
MarkDownParser.defaultProps = {
  content: '',
  currentTask: {},
  showLineNumbers: true,
  showInlineLineNumbers: true,
  assetData: null,
};

export default MarkDownParser;
