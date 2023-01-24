import { useEffect, useState } from 'react'

import { Form, Label, SelectField, TextField } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

const DISCOUNTINUED = 'discontinued',
  APPROVED = 'approved',
  PENDING_APPROVAL = 'pending approval',
  PENDING_REVOKE = 'pending revoke'

export const QUERY = gql`
  query FindRequestManagementQuery {
    leaves {
      id
      dateStart
      dateEnd
      status
      deductedDays
      leaveType {
        name
      }
      requester {
        firstName
        lastName
      }
      approver {
        firstName
        lastName
      }
    }
  }
`

const REVOKE_LEAVE_MUTATION = gql`
  mutation RevokeLeaveMutation($id: Int!, $input: ApproveLeaveInput!) {
    approveLeave(id: $id, input: $input) {
      id
      status
      dateStart
      dateEnd
      requesterId
      leaveType {
        name
      }
    }
  }
`

const SEND_NOTIFICATION_MUTATION = gql`
  mutation SendNotificationMutation($input: CreateNotificationInput!) {
    createNotification(input: $input) {
      id
    }
  }
`

export const Loading = () => <div className="loader"></div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ leaves: allLeaves }) => {
  const [searchField, setSearchField] = useState('')
  const [number, setNumber] = useState(10)
  const [leaves, setLeaves] = useState(
    allLeaves
      .filter((leave) => leave.status != 0)
      .sort((a, b) => new Date(b.dateStart) - new Date(a.dateStart))
  )
  const [sendNotification] = useMutation(SEND_NOTIFICATION_MUTATION, {
    onCompleted: () => {
      toast.success('Absence request revoked successfully')
    },
    onError: () => {
      toast.error('Request could not be processed')
    },
  })
  const [revokeLeave] = useMutation(REVOKE_LEAVE_MUTATION, {
    onCompleted: (data) => {
      const index = leaves.map((n) => n.id).indexOf(data.approveLeave.id)
      var temp = [...leaves]
      let updatedLeave = { ...temp[index] }
      updatedLeave.status = 3
      temp[index] = updatedLeave
      setLeaves(temp)
      sendNotification({
        variables: {
          input: {
            userId: data.approveLeave.requesterId,
            seen: false,
            seenAt: null,
            text:
              'Your request ' +
              data.approveLeave.leaveType?.name +
              ' scheduled from ' +
              data.approveLeave.dateStart.split('T')[0] +
              ' to ' +
              data.approveLeave.dateEnd.split('T')[0] +
              ' has been discontinued',
          },
        },
      })
    },
    onError: () => {
      toast.error('Error processing request')
    },
  })

  useEffect(() => {
    if (searchField === '') {
      let localLeaves = allLeaves
        .filter((leave) => leave.status != 0)
        .sort((a, b) => new Date(b.dateStart) - new Date(a.dateStart))
      if (number !== 'all') {
        localLeaves = localLeaves.slice(0, number)
      }
      setLeaves(localLeaves)
    } else {
      let localLeaves = allLeaves
        .filter(
          (leave) =>
            leave.leaveType?.name.toLowerCase().includes(searchField) ||
            leave.requester?.firstName.toLowerCase().includes(searchField) ||
            leave.requester?.lastName.toLowerCase().includes(searchField) ||
            leave.dateStart.includes(searchField) ||
            leave.dateEnd.includes(searchField) ||
            (DISCOUNTINUED.includes(searchField) && leave.status === 3) ||
            (APPROVED.includes(searchField) && leave.status === 2) ||
            (PENDING_REVOKE.includes(searchField) && leave.status === 4) ||
            (PENDING_APPROVAL.includes(searchField) && leave.status === 1)
        )
        .sort((a, b) => new Date(b.dateStart) - new Date(a.dateStart))
      if (number !== 'all') {
        localLeaves = localLeaves.slice(0, number)
      }
      setLeaves(localLeaves)
    }
  }, [searchField, number])

  //&& new Date(leave.dateStart) >= new Date()
  const onRevoke = (id) => {
    const sure = confirm(
      'Are you sure you want to revoke request for this user? '
    )
    if (sure) {
      revokeLeave({
        variables: {
          id: parseInt(id),
          input: {
            status: 3,
            decidedAt: new Date(),
          },
        },
      })
    }
  }

  return (
    <div>
      <Toaster />
      <h1 className="text-center">Leaves</h1>

      <div className="row flex-center">
        <div className="row">
          <div className="lead">All leave request records for employees</div>
          <div className="col-md-6"></div>
        </div>
      </div>
      <div className="row">
        <Form>
          <div className="form-group col-md-2">
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Label
                name="entries"
                style={{ marginRight: 10, marginLeft: 10 }}
                className="control-label"
              >
                Entries
              </Label>
              <SelectField
                type="number"
                name="entries"
                onChange={(e) => setNumber(e.target.value)}
                className="form-control"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value="all">All</option>
              </SelectField>
            </div>
          </div>
          <div className="form-group pull-right">
            <TextField
              name="search"
              type="text"
              onChange={(e) => setSearchField(e.target.value.toLowerCase())}
              className="search form-control"
              placeholder="Search"
            />
          </div>
        </Form>
      </div>
      <hr></hr>
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
                <th>Requester</th>
                <th>Approver</th>
                <th></th>
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
                  <td>
                    {leave.requester?.firstName} {leave.requester?.lastName}
                  </td>
                  <td className="user-request-table-approver">
                    {leave?.approver.firstName + ' ' + leave?.approver.lastName}
                  </td>
                  <td>
                    {leave.status === 2 &&
                    new Date(leave.dateStart).getTime() >=
                      new Date().getTime() ? (
                      <button
                        onClick={() => onRevoke(leave.id)}
                        className="pull-right btn btn-default btn-xs revoke-btn single-click"
                      >
                        <i className="fa fa-trash"></i> Revoke
                      </button>
                    ) : (
                      <></>
                    )}
                  </td>

                  <td>
                    <span className="pull-right leave-request-row-status">
                      {leave.status === 1
                        ? 'Pending'
                        : leave.status === 2
                        ? 'Approved'
                        : leave.status === 4
                        ? 'Pending revoke'
                        : 'Discontinued'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
