// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <CalendarBody {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import CalendarBody from './CalendarBody'

export const generated = () => {
  return <CalendarBody />
}

export default {
  title: 'Components/CalendarBody',
  component: CalendarBody,
}
