module.exports = {
  pages: {
    // Enable translations for the following pages
    '*': ['common', 'navbar', 'footer', 'alert-message', 'share', 'live-event', 'call-to-action', 'code-viewer', 'program-card', 'final-project', 'profile', 'login', 'signup'],
    '/': ['home', 'social'],
    '/login': ['login', 'signup'],
    '/example': ['counter'],
    '/cohort/[cohortSlug]/[slug]/[version]': ['dashboard', 'choose-program', 'projects', 'profile', 'assignments'],
    '/cohort/[cohortSlug]/assignments': ['assignments', 'dashboard'],
    '/cohort/[cohortSlug]/student/[studentId]': ['student', 'assignments'],
    '/cohort/[cohortSlug]/student/[studentId]/assignment/[assignmentId]': ['assignment-report'],
    '/cohort/[cohortSlug]/attendance': ['attendance'],
    '/docs/[syllabusSlug]/[assetSlug]': ['docs'],
    '/interactive-exercises': ['exercises'],
    '/technology/[slug]': ['technologies'],
    '/read/[slug]': ['read'],
    '/lesson/[slug]': ['lesson'],
    '/lessons': ['lesson'],
    '/project/[slug]': ['projects'],
    '/checkout': ['signup'],
    '/interactive-coding-tutorial/[slug]': ['projects', 'exercises'],
    '/interactive-coding-tutorials': ['projects'],
    '/interactive-exercise/[slug]': ['exercises', 'workshops'],
    '/choose-program': ['choose-program', 'dashboard', 'profile', 'assignments'],
    '/main-cohort/[mainCohortSlug]/syllabus/[cohortSlug]/[lesson]/[lessonSlug]': ['syllabus', 'dashboard', 'projects', 'assignments'],
    '/syllabus/[cohortSlug]/[lesson]/[lessonSlug]': ['syllabus', 'dashboard', 'projects', 'assignments'],
    '/survey/[surveyId]': ['survey'],
    '/mentorship': ['mentorship'],
    '/mentorship/schedule': ['mentorship', 'dashboard', 'signup', 'common'],
    '/how-to': ['how-to'],
    '/pricing': ['pricing', 'signup'],
    '/how-to/[slug]': ['how-to'],
    '/profile': ['profile'],
    '/profile/[slug]': ['profile'],
    '/thank-you': ['thank-you'],
    '/workshops/[event_slug]': ['workshops', 'signup'],
    '/join/cohort/[id]': ['dashboard', 'signup'],
    '/podcast': ['podcast'],
    '/accept-invite': ['accept-invite', 'signup'],
    '/bootcamp/[course_slug]': ['course', 'dashboard'],
  },
  locales: ['en', 'es'],
  defaultLocale: 'en',
  localeDetection: false,
  loadLocaleFrom: (lang, ns) => import(`./public/locales/${lang}/${ns}.json`).then((m) => m.default),
};
