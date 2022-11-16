import { render } from '@redwoodjs/testing/web'

import AddDepartmentPage from './AddDepartmentPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AddDepartmentPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AddDepartmentPage />)
    }).not.toThrow()
  })
})
