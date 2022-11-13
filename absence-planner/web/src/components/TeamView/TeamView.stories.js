// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <TeamView {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import TeamView from './TeamView'

export const generated = () => {
  return <TeamView />
}

export default {
  title: 'Components/TeamView',
  component: TeamView,
}
