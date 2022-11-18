import { MetaTags } from '@redwoodjs/web'

import RegisterCell from 'src/components/RegisterCell'

const RegisterPage = () => {
  return (
    <>
      <MetaTags title="Register" description="Register page" />
      <RegisterCell />
    </>
  )
}

export default RegisterPage
