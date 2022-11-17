// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <AddDepartment {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import AddDepartment from './AddDepartment'

export const generated = () => {
  return <AddDepartment />
}

export default {
  title: 'Components/AddDepartment',
  component: AddDepartment,
}
