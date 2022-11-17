// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <AddEmployee {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import AddEmployee from './AddEmployee'

export const generated = () => {
  return <AddEmployee />
}

export default {
  title: 'Components/AddEmployee',
  component: AddEmployee,
}
