// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <NewHoliday {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import NewHoliday from './NewHoliday'

export const generated = () => {
  return <NewHoliday />
}

export default {
  title: 'Components/NewHoliday',
  component: NewHoliday,
}
