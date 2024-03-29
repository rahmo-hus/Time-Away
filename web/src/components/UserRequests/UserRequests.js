const UserRequests = ({ leaves, onRevoke, onCancel }) => {
  return (
    <div className="row">
      {/* {{> show_flash_messages}} */}

      <div className="row main-row_header">
        <p className="col-md-12">Leave requests</p>
      </div>

      {!leaves || leaves.length === 0 ? (
        <div className="col-md-12 text-muted">
          There are no leave requests yet.
        </div>
      ) : (
        <div className="col-md-12">
          <p className="visible-xs-block">
            <em className="text-muted">Scroll table horizontally</em>
          </p>
          <div className="table-responsive">
            <table className="table table-hover user-requests-table">
              <thead>
                <tr>
                  <th>
                    Dates (from <i className="fa fa-long-arrow-right"></i> to)
                  </th>
                  <th>Type</th>
                  <th>Deducted</th>
                  <th>Approver</th>
                  <th></th>
                  <th className="col-xs-2">Comment</th>
                  <th>
                    <span className="pull-right">Status</span>
                  </th>
                </tr>
              </thead>

              <tbody>
                {leaves.map((leave) => (
                  <tr key={leave.id} className="leave-request-row">
                    <td data-tom-leave-dates="1">
                      <p>
                        {leave.dateStart.split('T')[0]}{' '}
                        <i className="fa fa-long-arrow-right"></i>{' '}
                        {leave.dateEnd.split('T')[0]}
                      </p>
                    </td>
                    <td>{leave.leaveType?.name}</td>
                    <td>{leave?.deductedDays}</td>
                    <td className="user-request-table-approver">
                      {leave?.approver.firstName +
                        ' ' +
                        leave?.approver.lastName}
                    </td>
                    <td>
                      {leave.status === 2 &&
                      new Date(leave.dateStart).getTime() >=
                        new Date().getTime() ? (
                        <button
                          onClick={() => onRevoke({ id: leave.id })}
                          className="pull-right btn btn-default btn-xs revoke-btn single-click"
                        >
                          <i className="fa fa-trash"></i> Revoke
                        </button>
                      ) : leave.status === 1 || leave.status === 4 ? (
                        <button
                          onClick={() =>
                            onCancel({ id: leave.id, status: leave.status })
                          }
                          className="pull-right btn btn-default btn-xs revoke-btn single-click"
                        >
                          <i className="fa fa-trash"></i> Cancel
                        </button>
                      ) : (
                        <></>
                      )}
                    </td>
                    <td>{leave.employeeComment}</td>
                    <td>
                      <span className="pull-right leave-request-row-status">
                        {leave.status === 1
                          ? 'Pending'
                          : leave.status === 2
                          ? 'Approved'
                          : leave.status === 4
                          ? 'Pending revoke'
                          : ''}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserRequests
