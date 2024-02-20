import rhinoUITheme from "./rhinoUITheme";

export const parameters = {
  docs: {
    theme: rhinoUITheme,
  },
  a11y: {
    element: '#root',
    config: {},
    options: {},
    manual: false,
  },
  options: {
    storySort: {
      order: [
        'About',
        ['Introduction', 'Get Started', 'Contributing'],
        'Foundation',
        ['Design Principles', 'Design Tokens'],
        'Content',
        ['Goals and Principles', 'Voice and Tone', 'Grammar and Mechanics', 'Word List'],
        'Theming',
        ['Overview', 'Form Controls'],
        'Components',
        'Patterns',
      ],
    },
  },
};
