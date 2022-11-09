import { render } from '@redwoodjs/testing/web'

import Absences from './Absences'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Absences', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Absences />)
    }).not.toThrow()
  })
})
