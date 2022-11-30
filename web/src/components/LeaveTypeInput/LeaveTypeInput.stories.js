// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <LeaveTypeInput {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import LeaveTypeInput from './LeaveTypeInput'

export const generated = () => {
  return <LeaveTypeInput />
}

export default {
  title: 'Components/LeaveTypeInput',
  component: LeaveTypeInput,
}
