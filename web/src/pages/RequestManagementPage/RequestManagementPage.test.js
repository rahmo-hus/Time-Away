import { render } from '@redwoodjs/testing/web'

import RequestManagementPage from './RequestManagementPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('RequestManagementPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RequestManagementPage />)
    }).not.toThrow()
  })
})
