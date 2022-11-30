// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <Settings {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import Settings from './Settings'

export const generated = () => {
  return <Settings />
}

export default {
  title: 'Components/Settings',
  component: Settings,
}
