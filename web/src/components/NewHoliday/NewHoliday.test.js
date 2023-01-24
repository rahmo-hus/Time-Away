import { render } from '@redwoodjs/testing/web'

import NewHoliday from './NewHoliday'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('NewHoliday', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NewHoliday />)
    }).not.toThrow()
  })
})
