import { render } from '@redwoodjs/testing/web'

import TeamViewPage from './TeamViewPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('TeamViewPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TeamViewPage />)
    }).not.toThrow()
  })
})
