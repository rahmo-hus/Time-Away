import { render } from '@redwoodjs/testing/web'

import NewAbsencePage from './NewAbsencePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('NewAbsencePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NewAbsencePage />)
    }).not.toThrow()
  })
})
