/* eslint-disable jsx-a11y/anchor-is-valid */
import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'

import NotificationCell from 'src/components/NotificationCell'

const PublicLayout = ({ children }) => {
  const { isAuthenticated, currentUser, logOut, hasRole } = useAuth()

  return (
    <>
      <div className="container">
        <header>
          <div className="header">
            <nav className="navbar navbar-default">
              <div className="navbar-header">
                <Link className="navbar-brand" to={routes.login()}>
                  Absence planner
                </Link>
              </div>
              {isAuthenticated && (
                <div
                  className="collapse navbar-collapse"
                  id="bs-example-navbar-collapse-1"
                >
                  <ul className="nav navbar-nav navbar-left">
                    <li>
                      <Link to={routes.calendar()}>Calendar</Link>
                    </li>
                    <li>
                      <Link to={routes.teamView()}>Team View</Link>
                    </li>
                    {hasRole('manager') && (
                      <li className="hidden-xs">
                        <Link to={routes.viewEmployees()}>Employees</Link>
                      </li>
                    )}
                    <li className="navbar-form navbar-left">
                      <div className="form-group">
                        <Link className="btn btn-info" to={routes.newAbsence()}>
                          New absence
                        </Link>
                      </div>
                    </li>
                  </ul>

                  <ul className="nav navbar-nav navbar-right">
                    <NotificationCell id={currentUser.id} hasRole={hasRole} />

                    {hasRole('manager') && (
                      <li className="dropdown hidden-xs">
                        <a
                          href="#"
                          className="dropdown-toggle"
                          data-toggle="dropdown"
                          role="button"
                          aria-expanded="true"
                        >
                          <span className="fa fa-gears"></span>{' '}
                          <span className="caret"></span>
                        </a>
                        <ul className="dropdown-menu" role="menu">
                          <li>
                            <a href="/settings/general/">General</a>
                          </li>
                          <li role="separator" className="divider"></li>
                          <li>
                            <Link to={routes.departments()}>Departments</Link>
                          </li>
                          <li>
                            <a href="/settings/bankholidays/">Bank Holidays</a>
                          </li>
                          <li>
                            <Link to={routes.addEmployee()}>Add employees</Link>
                          </li>
                          <li role="separator" className="divider"></li>
                          <li>
                            <a href="/audit/email/">Emails audit</a>
                          </li>
                          <li>
                            <a href="/reports/">Reports</a>
                          </li>
                        </ul>
                      </li>
                    )}
                    <li className="dropdown hidden-xs">
                      <a
                        id="me_menu"
                        href="#"
                        className="dropdown-toggle"
                        data-toggle="dropdown"
                        role="button"
                        aria-expanded="false"
                      >
                        Me <span className="caret"></span>
                      </a>
                      <ul className="dropdown-menu" role="menu">
                        <li>
                          <a href="/requests/">Requests</a>
                        </li>
                        <li className="hidden-xs">
                          <a href="/calendar/feeds/">Feeds</a>
                        </li>
                        <li role="separator" className="divider hidden-xs"></li>
                        <li>
                          <a href="#" onClick={logOut}>
                            Logout
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              )}
              {!isAuthenticated && (
                <div
                  className="collapse navbar-collapse"
                  id="bs-example-navbar-collapse-1"
                >
                  <ul className="nav navbar-nav navbar-right">
                    <li>
                      <Link to={routes.login()}>Login</Link>
                    </li>
                  </ul>
                </div>
              )}
            </nav>
          </div>
        </header>
        {children}
      </div>
    </>
  )
}

export default PublicLayout
