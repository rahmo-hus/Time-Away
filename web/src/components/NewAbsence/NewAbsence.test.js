import { render } from '@redwoodjs/testing/web'

import NewAbsence from './NewAbsence'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('NewAbsence', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NewAbsence />)
    }).not.toThrow()
  })
})
