// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <Absences {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import Absences from './Absences'

export const generated = () => {
  return <Absences />
}

export default {
  title: 'Components/Absences',
  component: Absences,
}
