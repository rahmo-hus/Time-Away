import { render } from '@redwoodjs/testing/web'

import EditDepartmentPage from './EditDepartmentPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('EditDepartmentPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EditDepartmentPage />)
    }).not.toThrow()
  })
})
