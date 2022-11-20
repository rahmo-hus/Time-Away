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

export const Loading = () => <div>Loading...</div>

export const Empty = () => (
  <div className="col-md-12 text-muted">
    There are no leave requests to decide on.
  </div>
)

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ requests }) => {
  const [submissionSuccess, setSubmissionSuccess] = useState(0)
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
        setSubmissionSuccess(data.approveLeave.id)
        sendNotification({
          variables: {
            input: {
              userId: data.approveLeave.requesterId,
              seen: false,
              seenAt: null,
              text:
                'Your request for ' +
                data.approveLeave.leaveType?.name +
                ' scheduled from ' +
                data.approveLeave.dateStart +
                ' to ' +
                data.approveLeave.dateEnd +
                ' has been ' +
                (data.approveLeave.status === 2 ? 'approved' : 'rejected'),
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
