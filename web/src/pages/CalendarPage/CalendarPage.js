import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'

import CalendarCell from 'src/components/CalendarCell'

const CalendarPage = () => {
  const { currentUser } = useAuth()

  return (
    <>
      <MetaTags title="Calendar" description="Calendar page" />
      <CalendarCell userId={currentUser.id} companyId={currentUser.companyId} />
    </>
  )
}

export default CalendarPage
