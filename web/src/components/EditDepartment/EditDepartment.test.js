import { render } from '@redwoodjs/testing/web'

import EditDepartment from './EditDepartment'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('EditDepartment', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EditDepartment />)
    }).not.toThrow()
  })
})
