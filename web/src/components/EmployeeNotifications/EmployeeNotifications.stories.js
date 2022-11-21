// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <EmployeeNotifications {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import EmployeeNotifications from './EmployeeNotifications'

export const generated = () => {
  return <EmployeeNotifications />
}

export default {
  title: 'Components/EmployeeNotifications',
  component: EmployeeNotifications,
}
