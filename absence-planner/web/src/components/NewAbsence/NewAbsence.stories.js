// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <NewAbsence {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import NewAbsence from './NewAbsence'

export const generated = () => {
  return <NewAbsence />
}

export default {
  title: 'Components/NewAbsence',
  component: NewAbsence,
}
