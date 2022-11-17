import { render } from '@redwoodjs/testing/web'

import DepartmentsPage from './DepartmentsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('DepartmentsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DepartmentsPage />)
    }).not.toThrow()
  })
})
