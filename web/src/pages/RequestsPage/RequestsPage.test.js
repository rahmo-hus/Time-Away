import { render } from '@redwoodjs/testing/web'

import RequestsPage from './RequestsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('RequestsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RequestsPage />)
    }).not.toThrow()
  })
})
