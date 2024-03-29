import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import UserRequests from 'src/components/UserRequests'
export const beforeQuery = ({ userId }) => ({
  variables: { userId },
})

export const QUERY = gql`
  query UserRequestsQuery($userId: Int!) {
    user: user(id: $userId) {
      department {
        id
        name
        allowance
        isAccruedAllowance
      }
      allowanceAdjustment {
        id
        year
        adjustment
        carriedOverAllowance
      }
      allLeaves {
        id
        status
        employeeComment
        approverComment
        dateStart
        deductedDays
        dateEnd
        approver {
          firstName
          lastName
        }
      }
    }
  }
`

const ALTER_REQUEST_MUTATION = gql`
  mutation RevokeRequestMutation($id: Int!, $input: ApproveLeaveInput!) {
    revokeRequest: approveLeave(id: $id, input: $input) {
      id
    }
  }
`

export const Loading = () => <div className="loader"></div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ user }) => {
  const { allLeaves } = user
  const [alternateRequest] = useMutation(ALTER_REQUEST_MUTATION, {
    onCompleted: () => {
      toast.success('Revoke request sent for approval')
    },
    onError: () => {
      toast.error('Request could not be processed')
    },
  })

  const [deleteRequest] = useMutation(ALTER_REQUEST_MUTATION, {
    onCompleted: () => {
      toast.success('Request has been cancelled')
    },
    onError: () => {
      toast.error('Request could not be processed')
    },
  })

  const onRevokeRequest = (input) => {
    alternateRequest({
      variables: {
        id: input.id,
        input: {
          status: 4,
        },
      },
    })
  }

  const onCancelRequest = (input) => {
    const status = input.status === 1 ? 3 : 2
    deleteRequest({
      variables: {
        id: input.id,
        input: {
          status: status,
        },
      },
    })
  }

  const processedLeaves = allLeaves.filter((leave) => leave.status !== 3)

  return (
    <div>
      <Toaster />

      <h1 className="flex-center">Leave requests</h1>

      <div className="row">
        <div className="col-md-12 lead flex-center">
          List of all leave requests
        </div>
      </div>
      <hr></hr>
      <UserRequests
        leaves={processedLeaves}
        onCancel={onCancelRequest}
        onRevoke={onRevokeRequest}
      />
    </div>
  )
}
