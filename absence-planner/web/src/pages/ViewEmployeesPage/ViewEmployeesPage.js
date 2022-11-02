import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import ViewEmployeesCell  from 'src/components/ViewEmployeesCell'
import {useAuth} from '@redwoodjs/auth'

const ViewEmployeesPage = () => {

  const {currentUser} = useAuth();

  return (
    <>
      <MetaTags title="ViewEmployees" description="ViewEmployees page" />
      <ViewEmployeesCell companyId = {currentUser.companyId}/>
    </>
  )
}

export default ViewEmployeesPage
