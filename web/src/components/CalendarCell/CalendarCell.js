import Calendar from 'src/components/Calendar'

export const beforeQuery = ({ userId }) => ({
  variables: { userId },
})

export const QUERY = gql`
  query LeavesQuery($userId: Int!) {
    leaves: leaves {
      id
      status
      employeeComment
      approverComment
      dateStart
      dateEnd
      deductedDays
      approver {
        firstName
        lastName
      }
      leaveType {
        id
        name
        color
      }
    }
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

export const Loading = () => <div>Loading...</div>

//  export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ leaves, user, leaveTypes }) => {
  const { allowanceAdjustment, allLeaves } = user

  return (
    <Calendar
      leavesByCurrentUser={allLeaves}
      department={user.department}
      leaveRequests={leaves}
      allowanceAdjustment={allowanceAdjustment}
      leaveTypes={leaveTypes}
    />
  )
}
