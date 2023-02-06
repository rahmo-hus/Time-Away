import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'

const Requests = ({
  requests,
  onApprove,
  onReject,
  loading,
  submissionSuccess,
}) => {
  const { currentUser } = useAuth()

  const parseDate = (date) => {
    return date.split('T')[0]
  }

  return (
    <div>
      <h1 className="flex-center">
        {currentUser.firstName} {currentUser.lastName} employee requests
      </h1>

      {/* {{> show_flash_messages}} */}

      <div className="row main-row_header">
        <p className="col-md-12 flex-center">Leave request to approve</p>
      </div>
      <hr></hr>

      <div className="row">
        <div className="col-md-12">
          <p className="visible-xs-block">
            <em className="text-muted">Scroll table horizontally</em>
          </p>
          <div className="table-responsive">
            <table className="table table-hover requests-to-approve-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Department</th>
                  <th>Date of request</th>
                  <th>Leave dates</th>
                  <th>Type</th>
                  <th>Days</th>
                  <th className="col-xs-2">Comment</th>
                  <th colSpan="2"></th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr key={request.id}>
                    <td>
                      <Link
                        to={routes.editEmployee({ id: request.requester?.id })}
                      >
                        {request?.requester?.firstName}{' '}
                        {request?.requester?.lastName}
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={routes.editDepartment({
                          id: request.requester?.department?.id,
                        })}
                      >
                        {request.requester?.department?.name}
                      </Link>
                    </td>
                    <td className="date_of_request">
                      {parseDate(request.createdAt)}
                    </td>
                    <td data-tom-leave-dates="1">
                      {parseDate(request.dateStart)}{' '}
                      <i className="fa fa-long-arrow-right"></i>{' '}
                      {parseDate(request.dateEnd)}
                    </td>
                    <td>
                      {request.status === 4 ? <b>REVOKE</b> : ''}{' '}
                      {request?.leaveType.name}
                    </td>
                    <td data-vpp="days_used">{request.deductedDays}</td>
                    <td>{request.comment}</td>
                    <td>
                      <button
                        disabled={
                          loading || submissionSuccess.includes(request.id)
                        }
                        className="btn btn-warning single-click"
                        onClick={() =>
                          request.status === 1
                            ? onReject({
                                id: request.id,
                                previousStatus: request.status,
                              })
                            : onApprove({
                                id: request.id,
                                previousStatus: request.status,
                              })
                        }
                      >
                        Reject
                      </button>
                    </td>
                    <td>
                      <button
                        disabled={
                          loading || submissionSuccess.includes(request.id)
                        }
                        className="btn btn-success single-click"
                        onClick={() =>
                          request.status === 1
                            ? onApprove({
                                id: request.id,
                                previousStatus: 1,
                              })
                            : onReject({
                                id: request.id,
                                previousStatus: request.status,
                              })
                        }
                      >
                        Approve
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

export default Requests
