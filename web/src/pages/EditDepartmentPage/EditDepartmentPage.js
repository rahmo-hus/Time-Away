import { MetaTags } from '@redwoodjs/web'

import EditDepartmentCell from 'src/components/EditDepartmentCell'

const EditDepartmentPage = ({ id }) => {
  return (
    <>
      <MetaTags title="EditDepartment" description="EditDepartment page" />
      <EditDepartmentCell id={parseInt(id)} />
    </>
  )
}

export default EditDepartmentPage
