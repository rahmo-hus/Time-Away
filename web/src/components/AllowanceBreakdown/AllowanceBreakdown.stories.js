// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <AllowanceBreakdown {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import AllowanceBreakdown from './AllowanceBreakdown'

export const generated = () => {
  return <AllowanceBreakdown />
}

export default {
  title: 'Components/AllowanceBreakdown',
  component: AllowanceBreakdown,
}
