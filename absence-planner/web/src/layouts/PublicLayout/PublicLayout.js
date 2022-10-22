const PublicLayout = ({ children }) => {
  return <>
    <div className="container">
      <header>
        <div className="header">
          <nav className="navbar navbar-default">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">TimeOff.Management</a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav navbar-left">
                <li><a href="/calendar/">Calendar</a></li>
                <li><a href="/calendar/teamview/">Team View</a></li>
                <li className="hidden-xs"><a href="/users/">Employees</a></li>
                <li className="navbar-form navbar-left">
                  <div className="form-group">
                    <button type="button" className="btn btn-info" data-toggle="modal" data-target="#book_leave_modal" id="book_time_off_btn">New absence</button>
                  </div>
                </li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li className="dropdown" id="header-notification-dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                    <span className="fa fa-bell-o"></span>
                    <span className="label label-info notification-badge hidden"></span>
                  </a>
                  <ul className="dropdown-menu" role="menu">
                    <li className="dropdown-header">No notifications</li>
                  </ul>
                </li>
                <li className="dropdown hidden-xs">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><span className="fa fa-gears"></span> <span className="caret"></span></a>
                  <ul className="dropdown-menu" role="menu">
                    <li><a href="/settings/general/">General</a></li>
                    <li role="separator" className="divider"></li>
                    <li><a href="/settings/departments/">Departments</a></li>
                    <li><a href="/settings/bankholidays/">Bank Holidays</a></li>
                    <li><a href="/settings/company/authentication/">LDAP configuration</a></li>
                    <li><a href="/settings/company/integration-api/">API configuration</a></li>
                    <li><a href="/users/import/">Import employees</a></li>
                    <li role="separator" className="divider"></li>
                    <li><a href="/audit/email/">Emails audit</a></li>
                    <li><a href="/reports/">Reports</a></li>
                  </ul>
                </li>
                <li className="visible-xs-block"><a href="/requests/">Requests</a></li>
                <li className="visible-xs-block"><a href="/logout/">Logout</a></li>
                <li className="dropdown hidden-xs">
                  <a id="me_menu" href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Me <span className="caret"></span></a>
                  <ul className="dropdown-menu" role="menu">
                    <li><a href="/requests/">Requests</a></li>
                    <li className="hidden-xs"><a href="/calendar/feeds/">Feeds</a></li>
                    <li role="separator" className="divider hidden-xs"></li>
                    <li><a href="/logout/">Logout</a></li>
                  </ul>
                </li>
                <li><a href="/login/">Login</a></li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
      {children}
    </div></>
}

export default PublicLayout