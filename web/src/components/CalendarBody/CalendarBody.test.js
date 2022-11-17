import { render } from '@redwoodjs/testing/web'

import CalendarBody from './CalendarBody'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CalendarBody', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CalendarBody />)
    }).not.toThrow()
  })
})
