import { render } from '@redwoodjs/testing/web'

import Register from './Register'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Register', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Register />)
    }).not.toThrow()
  })
})
