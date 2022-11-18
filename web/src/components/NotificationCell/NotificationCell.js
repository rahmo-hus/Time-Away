/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, routes } from '@redwoodjs/router'

export const QUERY = gql`
  query FindRequestedLeaves($id: Int!) {
    requestedLeaves: requestedLeaves(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => (
  <li className="dropdown" id="header-notification-dropdown">
    <a
      href="#"
      className="dropdown-toggle"
      data-toggle="dropdown"
      role="button"
      aria-expanded="false"
    >
      <span className="fa fa-bell-o"></span>
      <span className="label label-info notification-badge hidden"></span>
    </a>
    <ul className="dropdown-menu" role="menu">
      <li className="dropdown-header">No notifications</li>
    </ul>
  </li>
)

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ requestedLeaves }) => {
  const length = requestedLeaves.length

  return (
    <li className="dropdown" id="header-notification-dropdown">
      <a
        href="#"
        className="dropdown-toggle"
        data-toggle="dropdown"
        role="button"
        aria-expanded="false"
      >
        <span className="fa fa-bell-o"></span>
        <span className="label label-info notification-badge">{length}</span>
      </a>
      <ul className="dropdown-menu" role="menu">
        <li className="dropdown-header">
          <Link to={routes.requests()}>{length} leave requests to process</Link>
        </li>
      </ul>
    </li>
  )
}
