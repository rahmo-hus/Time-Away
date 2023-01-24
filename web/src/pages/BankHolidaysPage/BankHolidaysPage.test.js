import { render } from '@redwoodjs/testing/web'

import BankHolidaysPage from './BankHolidaysPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('BankHolidaysPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BankHolidaysPage />)
    }).not.toThrow()
  })
})
