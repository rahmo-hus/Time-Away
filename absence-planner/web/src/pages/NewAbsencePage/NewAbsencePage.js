import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import NewAbsenceCell from 'src/components/NewAbsenceCell'

const NewAbsencePage = () => {
  return (
    <>
      <MetaTags title="NewAbsence" description="NewAbsence page" />
      <NewAbsenceCell/>
    </>
  )
}

export default NewAbsencePage
