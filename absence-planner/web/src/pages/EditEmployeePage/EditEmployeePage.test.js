import { render } from '@redwoodjs/testing/web'

import EditEmployeePage from './EditEmployeePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('EditEmployeePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EditEmployeePage />)
    }).not.toThrow()
  })
})
