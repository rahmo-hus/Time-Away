import { render } from '@redwoodjs/testing/web'

import UserRequestsPage from './UserRequestsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('UserRequestsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserRequestsPage />)
    }).not.toThrow()
  })
})
