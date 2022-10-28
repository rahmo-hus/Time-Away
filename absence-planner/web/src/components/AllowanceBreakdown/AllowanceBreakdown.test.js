import { render } from '@redwoodjs/testing/web'

import AllowanceBreakdown from './AllowanceBreakdown'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AllowanceBreakdown', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AllowanceBreakdown />)
    }).not.toThrow()
  })
})
