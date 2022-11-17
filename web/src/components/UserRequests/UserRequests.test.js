import { render } from '@redwoodjs/testing/web'

import UserRequests from './UserRequests'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('UserRequests', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserRequests />)
    }).not.toThrow()
  })
})
