import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import Calendar from 'src/components/Calendar'

export const beforeQuery = ({ userId }) => ({
  variables: { userId },
})

export const QUERY = gql`
  query LeavesQuery($userId: Int!) {
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
        leaveType {
          id
          name
          color
          limit
        }
      }
    }
    leaveTypes: leaveTypes {
      id
      name
      color
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

export const Loading = () => <div>Loading...</div>

//  export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ user, leaveTypes }) => {
  const { allowanceAdjustment, allLeaves } = user

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
    <>
      <Toaster />
      <Calendar
        leavesByCurrentUser={processedLeaves}
        department={user.department}
        allowanceAdjustment={allowanceAdjustment}
        leaveTypes={leaveTypes}
        onRevoke={onRevokeRequest}
        onCancel={onCancelRequest}
      />
    </>
  )
}
