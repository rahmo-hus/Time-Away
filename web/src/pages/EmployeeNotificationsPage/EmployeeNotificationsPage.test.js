import { render } from '@redwoodjs/testing/web'

import EmployeeNotificationsPage from './EmployeeNotificationsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('EmployeeNotificationsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EmployeeNotificationsPage />)
    }).not.toThrow()
  })
})
