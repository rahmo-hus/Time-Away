import { render } from '@redwoodjs/testing/web'

import EmployeeNotifications from './EmployeeNotifications'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('EmployeeNotifications', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EmployeeNotifications />)
    }).not.toThrow()
  })
})
