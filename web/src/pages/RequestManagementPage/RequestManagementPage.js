import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'

import RequestManagementCell from 'src/components/RequestManagementCell'
const RequestManagementPage = () => {
  const { currentUser } = useAuth()
  return (
    <>
      <MetaTags
        title="RequestManagement"
        description="RequestManagement page"
      />
      <RequestManagementCell companyId={currentUser.companyId} />
    </>
  )
}

export default RequestManagementPage
