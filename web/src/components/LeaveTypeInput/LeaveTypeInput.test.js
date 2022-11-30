import { render } from '@redwoodjs/testing/web'

import LeaveTypeInput from './LeaveTypeInput'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('LeaveTypeInput', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LeaveTypeInput />)
    }).not.toThrow()
  })
})
