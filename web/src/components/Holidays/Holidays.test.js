import { render } from '@redwoodjs/testing/web'

import Holidays from './Holidays'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Holidays', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Holidays />)
    }).not.toThrow()
  })
})
