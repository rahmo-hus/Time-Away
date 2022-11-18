import { render } from '@redwoodjs/testing/web'

import Requests from './Requests'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Requests', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Requests />)
    }).not.toThrow()
  })
})
