import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'

const AdminLayout = ({ children }) => {
  const { logOut } = useAuth()

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

              <ul className="nav navbar-nav navbar-right">
                <li>
                  <div
                    className="collapse navbar-collapse"
                    id="bs-example-navbar-collapse-1"
                  >
                    <ul className="nav navbar-nav navbar-right">
                      <li style={{ marginRight: 10 }}>
                        <Link className="btn" onClick={logOut}>
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        {children}
        <div>&nbsp;</div>
      </div>
    </>
  )
}

export default AdminLayout
