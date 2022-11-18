import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'

import AddEmployeeCell from 'src/components/AddEmployeeCell'

const AddEmployeePage = () => {
  const { currentUser } = useAuth()

  return (
    <>
      <MetaTags title="AddEmployee" description="AddEmployee page" />
      <AddEmployeeCell userId={currentUser.id} />
    </>
  )
}

export default AddEmployeePage
