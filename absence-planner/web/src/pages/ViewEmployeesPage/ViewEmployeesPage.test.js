import { render } from '@redwoodjs/testing/web'

import ViewEmployeesPage from './ViewEmployeesPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ViewEmployeesPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ViewEmployeesPage />)
    }).not.toThrow()
  })
})
