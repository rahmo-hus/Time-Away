import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'

import BankHolidaysCell from 'src/components/BankHolidaysCell'

const BankHolidaysPage = () => {
  const { currentUser } = useAuth()
  return (
    <>
      <MetaTags title="BankHolidays" description="BankHolidays page" />
      <BankHolidaysCell companyId={currentUser.companyId} />
    </>
  )
}

export default BankHolidaysPage
