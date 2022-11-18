import { MetaTags } from '@redwoodjs/web'

import EditEmployeeCell from 'src/components/EditEmployeeCell'

const EditEmployeePage = ({ id }) => {
  return (
    <>
      <MetaTags title="EditEmployee" description="EditEmployee page" />
      <EditEmployeeCell id={parseInt(id)} />
    </>
  )
}

export default EditEmployeePage
