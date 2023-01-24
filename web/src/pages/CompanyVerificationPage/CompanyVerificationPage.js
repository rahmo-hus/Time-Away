import { MetaTags } from '@redwoodjs/web'

import CompanyVerificationCell from 'src/components/CompanyVerificationCell'

const CompanyVerificationPage = () => {
  return (
    <>
      <MetaTags
        title="CompanyVerification"
        description="CompanyVerification page"
      />
      <CompanyVerificationCell />
    </>
  )
}

export default CompanyVerificationPage
