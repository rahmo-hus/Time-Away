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
                  TimeAway
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
                            <Link to={routes.settings()}>General</Link>
                          </li>
                          <li role="separator" className="divider"></li>
                          <li>
                            <Link to={routes.departments()}>Departments</Link>
                          </li>
                          <li>
                            <Link to={routes.bankHolidays()}>
                              Public Holidays
                            </Link>
                          </li>
                          <li>
                            <Link to={routes.addEmployee()}>Add employees</Link>
                          </li>
                        </ul>
                      </li>
                    )}
                    <li className="dropdown hidden-xs">
                      <a
                        className="dropdown-toggle"
                        data-toggle="dropdown"
                        role="button"
                        aria-expanded="false"
                      >
                        Me <span className="caret"></span>
                      </a>
                      <ul className="dropdown-menu" role="menu">
                        <li>
                          {hasRole('manager') ? (
                            <Link to={routes.requestManagement()}>
                              Leaves Management
                            </Link>
                          ) : (
                            <Link to={routes.userRequests()}>Requests</Link>
                          )}
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
        <div>&nbsp;</div>
        {/* <footer className="footer custom-footer">
          <p>
            <span className="pull-left">
              © <a href="http://time.away">TimeAway ETFBL</a> 2023
            </span>
            <span className="pull-right">
              <a
                href="//github.com/rahmo-hus/Absence-planner"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa fa-github fa-lg"></i>
              </a>
              <a href="//twitter.com" target="_blank" rel="noreferrer">
                <i className="fa fa-twitter fa-lg"></i>
              </a>
              <a href="mailto:huseinagicrahmo@gmail.com">
                <i className="fa fa-envelope fa-lg"></i>
              </a>
            </span>
          </p>
        </footer> */}
      </div>
    </>
  )
}

export default PublicLayout
