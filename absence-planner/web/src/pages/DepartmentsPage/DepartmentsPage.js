import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import DepartmentsCell from 'src/components/DepartmentsCell'

const DepartmentsPage = () => {
  return (
    <>
      <MetaTags title="Departments" description="Departments page" />
      <DepartmentsCell/>
    </>
  )
}

export default DepartmentsPage
