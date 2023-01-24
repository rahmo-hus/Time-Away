import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'

import DepartmentsCell from 'src/components/DepartmentsCell'

const DepartmentsPage = () => {
  const { currentUser } = useAuth()
  return (
    <>
      <MetaTags title="Departments" description="Departments page" />
      <DepartmentsCell companyId={currentUser.companyId} />
    </>
  )
}

export default DepartmentsPage
