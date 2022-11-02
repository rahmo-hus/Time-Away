import { render } from '@redwoodjs/testing/web'

import ViewEmployees from './ViewEmployees'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ViewEmployees', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ViewEmployees />)
    }).not.toThrow()
  })
})
