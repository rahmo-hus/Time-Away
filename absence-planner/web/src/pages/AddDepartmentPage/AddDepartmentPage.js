import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import AddDepartmentCell from 'src/components/AddDepartmentCell'
import {useAuth} from '@redwoodjs/auth'

const AddDepartmentPage = () => {

  const {currentUser} = useAuth();
  return (
    <>
      <MetaTags title="AddDepartment" description="AddDepartment page" />
      <AddDepartmentCell companyId = {currentUser.companyId}/>
    </>
  )
}

export default AddDepartmentPage
