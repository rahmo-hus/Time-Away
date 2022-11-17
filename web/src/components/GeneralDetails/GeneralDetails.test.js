import { render } from '@redwoodjs/testing/web'

import GeneralDetails from './GeneralDetails'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('GeneralDetails', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GeneralDetails />)
    }).not.toThrow()
  })
})
