import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'

import RequestsCell from 'src/components/RequestsCell'
const RequestsPage = () => {
  const { currentUser } = useAuth()

  return (
    <>
      <MetaTags title="Requests" description="Requests page" />
      <RequestsCell id={currentUser.id} />
    </>
  )
}

export default RequestsPage
