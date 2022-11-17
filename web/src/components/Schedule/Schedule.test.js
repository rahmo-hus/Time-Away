import { render } from '@redwoodjs/testing/web'

import Schedule from './Schedule'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Schedule', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Schedule />)
    }).not.toThrow()
  })
})
