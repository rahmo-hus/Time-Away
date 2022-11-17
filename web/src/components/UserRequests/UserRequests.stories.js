// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <UserRequests {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import UserRequests from './UserRequests'

export const generated = () => {
  return <UserRequests />
}

export default {
  title: 'Components/UserRequests',
  component: UserRequests,
}
