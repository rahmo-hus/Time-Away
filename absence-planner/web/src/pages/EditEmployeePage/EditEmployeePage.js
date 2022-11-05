import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import EditEmployeeCell from 'src/components/EditEmployee'

const EditEmployeePage = ({id}) => {
  return (
    <>
      <MetaTags title="EditEmployee" description="EditEmployee page" />
      <EditEmployeeCell id={id}/>
    </>
  )
}

export default EditEmployeePage
