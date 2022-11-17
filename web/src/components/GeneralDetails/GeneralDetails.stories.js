// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <GeneralDetails {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import GeneralDetails from './GeneralDetails'

export const generated = () => {
  return <GeneralDetails />
}

export default {
  title: 'Components/GeneralDetails',
  component: GeneralDetails,
}
