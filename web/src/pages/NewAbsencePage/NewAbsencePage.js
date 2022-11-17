import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import NewAbsenceCell from 'src/components/NewAbsenceCell'
import { useAuth } from '@redwoodjs/auth'

const NewAbsencePage = () => {

  const {currentUser} = useAuth()

  return (
    <>
      <MetaTags title="NewAbsence" description="NewAbsence page" />
      <NewAbsenceCell userId = {currentUser.id}/>
    </>
  )
}

export default NewAbsencePage
