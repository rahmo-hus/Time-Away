import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'

import UserRequestsCell from 'src/components/UserRequestsCell'
const UserRequestsPage = () => {
  const { currentUser } = useAuth()
  return (
    <>
      <MetaTags title="UserRequests" description="UserRequests page" />
      <UserRequestsCell userId={currentUser.id} />
    </>
  )
}

export default UserRequestsPage
