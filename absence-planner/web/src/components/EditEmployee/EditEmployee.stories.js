// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <EditEmployee {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import EditEmployee from './EditEmployee'

export const generated = () => {
  return <EditEmployee />
}

export default {
  title: 'Components/EditEmployee',
  component: EditEmployee,
}
