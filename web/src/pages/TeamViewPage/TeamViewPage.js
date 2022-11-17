import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import TeamViewCell from 'src/components/TeamViewCell'
import {useAuth} from '@redwoodjs/auth'

const TeamViewPage = () => {

  const {currentUser} = useAuth();

  return (
    <>
      <MetaTags title="TeamView" description="TeamView page" />
      <TeamViewCell userId={currentUser.id}/>
    </>
  )
}

export default TeamViewPage
