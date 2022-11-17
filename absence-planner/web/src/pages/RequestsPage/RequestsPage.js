import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const RequestsPage = () => {
  return (
    <>
      <MetaTags title="Requests" description="Requests page" />

      <h1>RequestsPage</h1>
      <p>
        Find me in <code>./web/src/pages/RequestsPage/RequestsPage.js</code>
      </p>
      <p>
        My default route is named <code>requests</code>, link to me with `
        <Link to={routes.requests()}>Requests</Link>`
      </p>
    </>
  )
}

export default RequestsPage
