import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'

import SettingsCell from 'src/components/SettingsCell'
const SettingsPage = () => {
  const { currentUser } = useAuth()
  return (
    <>
      <MetaTags title="Settings" description="Settings page" />
      <SettingsCell id={currentUser.id} />
    </>
  )
}

export default SettingsPage
