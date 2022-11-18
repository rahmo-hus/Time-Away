import { useState } from 'react'

import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import Requests from 'src/components/Requests'

export const QUERY = gql`
  query FindAllRequestedLeaves($id: Int!) {
    requests: requestedLeaves(id: $id) {
      id
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
  const [approveLeave, { loading: loading }] = useMutation(
    APPROVE_REQUEST_MUTATION,
    {
      onCompleted: (data) => {
        setSubmissionSuccess(data.approveLeave.id)
        toast.success('Request processed successfully')
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
