import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'

import NewAbsenceCell from 'src/components/NewAbsenceCell'

const NewAbsencePage = () => {
  const { currentUser } = useAuth()

  return (
    <>
      <MetaTags title="NewAbsence" description="NewAbsence page" />
      <NewAbsenceCell
        userId={currentUser.id}
        companyId={currentUser.companyId}
      />
    </>
  )
}

export default NewAbsencePage
