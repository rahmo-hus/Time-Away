// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <Register {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import Register from './Register'

export const generated = () => {
  return <Register />
}

export default {
  title: 'Components/Register',
  component: Register,
}
