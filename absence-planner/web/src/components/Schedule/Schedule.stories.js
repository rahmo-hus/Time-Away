// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <Schedule {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import Schedule from './Schedule'

export const generated = () => {
  return <Schedule />
}

export default {
  title: 'Components/Schedule',
  component: Schedule,
}
