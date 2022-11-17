import { render } from '@redwoodjs/testing/web'

import EditEmployee from './EditEmployee'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('EditEmployee', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EditEmployee />)
    }).not.toThrow()
  })
})
