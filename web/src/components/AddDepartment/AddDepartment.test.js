import { render } from '@redwoodjs/testing/web'

import AddDepartment from './AddDepartment'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AddDepartment', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AddDepartment />)
    }).not.toThrow()
  })
})
