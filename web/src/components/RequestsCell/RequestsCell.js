import { useState } from 'react'

import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import Requests from 'src/components/Requests'

export const QUERY = gql`
  query FindAllRequestedLeaves($id: Int!) {
    requests: requestedLeaves(id: $id) {
      id
      status
      requester {
        id
        firstName
        lastName
        department {
          id
          name
        }
      }
      deductedDays
      employeeComment
      createdAt
      leaveType {
        name
      }
      dateStart
      dateEnd
      dayPartStart
      dayPartEnd
    }
  }
`

const APPROVE_REQUEST_MUTATION = gql`
  mutation ApproveRequestMutation($id: Int!, $input: ApproveLeaveInput!) {
    approveLeave(id: $id, input: $input) {
      id
      status
      requesterId
      dateStart
      dateEnd
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

export const Empty = () => (
  <div className="col-md-12 text-muted">
    There are no leave requests to decide on.
  </div>
)

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ requests }) => {
  const [submissionSuccess, setSubmissionSuccess] = useState([])
  const [previousStatus, setPreviousStatus] = useState(0)

  const determineDecisionStatus = (
    currentStatus,
    previousStatus,
    name,
    dateStart,
    dateEnd
  ) => {
    const revoke = previousStatus === 4 && currentStatus === 3 ? 'revoke ' : ''
    const approval =
      (previousStatus === 4 && currentStatus === 3) ||
      (previousStatus === 1 && currentStatus === 2)
        ? 'approved'
        : 'rejected'

    return (
      'Your ' +
      revoke +
      'request for ' +
      name +
      ' scheduled from ' +
      dateStart.split('T')[0] +
      ' to ' +
      dateEnd.split('T')[0] +
      ' has been ' +
      approval
    )
  }

  const [sendNotification] = useMutation(SEND_NOTIFICATION_MUTATION, {
    onCompleted: () => {
      toast.success('Request processed successfully')
    },
    onError: () => {
      toast.error('Request could not be processed')
    },
  })
  const [approveLeave, { loading: loading }] = useMutation(
    APPROVE_REQUEST_MUTATION,
    {
      onCompleted: (data) => {
        const submissionLocal = submissionSuccess
        submissionLocal.push(data.approveLeave.id)
        setSubmissionSuccess(submissionLocal)
        sendNotification({
          variables: {
            input: {
              userId: data.approveLeave.requesterId,
              seen: false,
              seenAt: null,
              text: determineDecisionStatus(
                data.approveLeave.status,
                previousStatus,
                data.approveLeave.leaveType?.name,
                data.approveLeave.dateStart,
                data.approveLeave.dateEnd
              ),
            },
          },
        })
      },
      onError: () => {
        toast.error('Request could not be processed')
      },
    }
  )

  const onApprove = (input) => {
    setPreviousStatus(input.previousStatus)
    approveLeave({
      variables: {
        id: input.id,
        input: {
          status: 2,
          decidedAt: new Date(),
        },
      },
    })
  }

  const onReject = (input) => {
    setPreviousStatus(input.previousStatus)
    approveLeave({
      variables: {
        id: input.id,
        input: {
          status: 3,
          decidedAt: new Date(),
        },
      },
    })
  }

  return (
    <>
      <Toaster />
      <Requests
        requests={requests}
        onApprove={onApprove}
        loading={loading}
        submissionSuccess={submissionSuccess}
        onReject={onReject}
      />
    </>
  )
}
