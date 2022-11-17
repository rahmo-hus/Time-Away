import { render } from '@redwoodjs/testing/web'

import AddEmployee from './AddEmployee'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AddEmployee', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AddEmployee />)
    }).not.toThrow()
  })
})
