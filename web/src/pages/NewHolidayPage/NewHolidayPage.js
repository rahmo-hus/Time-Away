import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'

import NewHoliday from 'src/components/NewHoliday/NewHoliday'

const NewHolidayPage = () => {
  const { currentUser } = useAuth()
  return (
    <>
      <MetaTags title="NewHoliday" description="NewHoliday page" />
      <NewHoliday companyId={currentUser.companyId} />
    </>
  )
}

export default NewHolidayPage
