// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <Departments {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import Departments from './Departments'

export const generated = () => {
  return <Departments />
}

export default {
  title: 'Components/Departments',
  component: Departments,
}
