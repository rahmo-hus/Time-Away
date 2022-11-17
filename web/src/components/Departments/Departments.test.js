import { render } from '@redwoodjs/testing/web'

import Departments from './Departments'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Departments', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Departments />)
    }).not.toThrow()
  })
})
