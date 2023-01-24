import { render } from '@redwoodjs/testing/web'

import NewHolidayPage from './NewHolidayPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('NewHolidayPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NewHolidayPage />)
    }).not.toThrow()
  })
})
