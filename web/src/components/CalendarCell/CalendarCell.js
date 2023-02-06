import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import Calendar from 'src/components/Calendar'

export const beforeQuery = ({ userId, companyId }) => ({
  variables: { userId, companyId },
})

export const QUERY = gql`
  query LeavesQuery($userId: Int!, $companyId: Int!) {
    company(id: $companyId) {
      name
      holidays {
        id
        name
        date
      }
      schedule {
        monday
        tuesday
        wednesday
        thursday
        friday
        saturday
        sunday
      }
    }
    user: user(id: $userId) {
      department {
        id
        name
        allowance
        includePublicHolidays
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
          useAllowance
          color
          limit
        }
      }
    }
    leaveTypes: leaveTypes {
      id
      name
      limit
      useAllowance
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

export const Loading = () => (
  <div>
    <div className="loader"></div>
  </div>
)

//  export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ user, leaveTypes, company }) => {
  const { allowanceAdjustment, allLeaves } = user
  const { holidays, schedule } = company

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
        holidays={holidays}
        schedule={schedule}
        allowanceAdjustment={allowanceAdjustment}
        leaveTypes={leaveTypes}
        onRevoke={onRevokeRequest}
        onCancel={onCancelRequest}
      />
    </>
  )
}
