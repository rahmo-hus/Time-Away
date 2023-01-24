/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, routes } from '@redwoodjs/router'

export const QUERY = gql`
  query FindRequestedLeaves($id: Int!) {
    requestedLeaves: requestedLeaves(id: $id) {
      id
    }
    user: user(id: $id) {
      notifications {
        id
        seen
      }
    }
  }
`

export const Loading = () => <div></div>

const Empty = () => (
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

export const Success = ({ requestedLeaves, hasRole, user }) => {
  const requestedLeavesLength = requestedLeaves.length
  const { notifications } = user
  const notificationsLength = notifications.filter(
    (notification) => notification.seen === false
  ).length

  if (hasRole('manager')) {
    if (requestedLeavesLength === 0) {
      return <Empty />
    } else {
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
            <span className="label label-info notification-badge">
              {requestedLeavesLength}
            </span>
          </a>
          <ul className="dropdown-menu" role="menu">
            <li className="dropdown-header">
              <Link to={routes.requests()}>
                {requestedLeavesLength} leave requests to process
              </Link>
            </li>
          </ul>
        </li>
      )
    }
  } else {
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
          <span className="label label-info notification-badge">
            {notificationsLength}
          </span>
        </a>
        <ul className="dropdown-menu" role="menu">
          <li className="dropdown-header">
            <Link to={routes.employeeNotifications()}>
              New notifications: {notificationsLength}
            </Link>
          </li>
        </ul>
      </li>
    )
  }
}
