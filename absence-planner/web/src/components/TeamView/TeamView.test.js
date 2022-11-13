import { render } from '@redwoodjs/testing/web'

import TeamView from './TeamView'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('TeamView', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TeamView />)
    }).not.toThrow()
  })
})
