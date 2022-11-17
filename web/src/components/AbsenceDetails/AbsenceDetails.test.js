import { render } from '@redwoodjs/testing/web'

import AbsenceDetails from './AbsenceDetails'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AbsenceDetails', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AbsenceDetails />)
    }).not.toThrow()
  })
})
