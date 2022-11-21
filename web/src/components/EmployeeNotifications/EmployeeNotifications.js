import { useAuth } from '@redwoodjs/auth'

const EmployeeNotifications = ({ notifications, onUpdate, onDelete }) => {
  const { currentUser } = useAuth()

  const parseDateAndTime = (dateTime) => {
    const date = dateTime.split('T')[0]
    let time = dateTime.split('T')[1]
    time = time.substring(0, time.length - 5)
    return date + ' ' + time
  }

  return (
    <div>
      <h1>
        {currentUser.firstName} {currentUser.lastName + "'s"} messages
      </h1>

      {/* {{> show_flash_messages}} */}

      <div className="row main-row_header">
        <p className="col-md-12">Notifications</p>
      </div>

      <div className="row">
        <div className="col-md-12">
          <p className="visible-xs-block">
            <em className="text-muted">Scroll table horizontally</em>
          </p>
          <div className="table-responsive">
            <table className="table table-hover requests-to-approve-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Text</th>
                  <th className="col-xs-2">Comment</th>
                  <th colSpan="2"></th>
                </tr>
              </thead>
              <tbody>
                {notifications.map((notification) => (
                  <tr
                    key={notification.id}
                    style={{
                      background: notification.seen ? 'white' : '#d6eefa',
                    }}
                  >
                    <td>
                      {notification.seen ? (
                        parseDateAndTime(notification.createdAt)
                      ) : (
                        <b>{parseDateAndTime(notification.createdAt)}</b>
                      )}
                    </td>
                    <td>
                      {notification.seen ? (
                        notification.text
                      ) : (
                        <b>{notification.text}</b>
                      )}
                    </td>

                    <td>{notification.comment}</td>
                    <td>
                      <button
                        onClick={() => onDelete({ id: notification.id })}
                        className="btn btn-warning single-click"
                      >
                        <i className="fa fa-trash" />
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() =>
                          onUpdate({
                            id: notification.id,
                            seen: !notification.seen,
                          })
                        }
                        className="btn btn-success single-click"
                      >
                        {notification.seen ? (
                          <i className="fa fa-eye-slash" />
                        ) : (
                          <i className="fa fa-eye" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeNotifications
