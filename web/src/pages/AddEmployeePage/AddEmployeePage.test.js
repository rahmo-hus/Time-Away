import { render } from '@redwoodjs/testing/web'

import AddEmployeePage from './AddEmployeePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AddEmployeePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AddEmployeePage />)
    }).not.toThrow()
  })
})
