import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'

import AddDepartmentCell from 'src/components/AddDepartmentCell'

const AddDepartmentPage = () => {
  const { currentUser } = useAuth()
  return (
    <>
      <MetaTags title="AddDepartment" description="AddDepartment page" />
      <AddDepartmentCell companyId={currentUser.companyId} />
    </>
  )
}

export default AddDepartmentPage
