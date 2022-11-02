// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <ViewEmployees {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import ViewEmployees from './ViewEmployees'

export const generated = () => {
  return <ViewEmployees />
}

export default {
  title: 'Components/ViewEmployees',
  component: ViewEmployees,
}
