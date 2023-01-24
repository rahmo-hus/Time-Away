import { render } from '@redwoodjs/testing/web'

import CompanyVerificationPage from './CompanyVerificationPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('CompanyVerificationPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CompanyVerificationPage />)
    }).not.toThrow()
  })
})
