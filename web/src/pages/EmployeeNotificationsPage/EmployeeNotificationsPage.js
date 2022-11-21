import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'

import EmployeeNotificationsCell from 'src/components/EmployeeNotificationsCell'

const EmployeeNotificationsPage = () => {
  const { currentUser } = useAuth()

  return (
    <>
      <MetaTags
        title="EmployeeNotifications"
        description="EmployeeNotifications page"
      />

      <EmployeeNotificationsCell id={currentUser.id} />
    </>
  )
}

export default EmployeeNotificationsPage
