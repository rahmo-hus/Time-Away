import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'

import TeamViewCell from 'src/components/TeamViewCell'

const TeamViewPage = () => {
  const { currentUser } = useAuth()

  return (
    <>
      <MetaTags title="TeamView" description="TeamView page" />
      <TeamViewCell userId={currentUser.id} />
    </>
  )
}

export default TeamViewPage
