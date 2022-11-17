import Calendar from "src/components/Calendar"
import {routes, navigate} from '@redwoodjs/router'
import { useEffect } from "react"

export const beforeQuery = ({ userId }) => ({
  variables: { userId }
})

export const QUERY = gql`
  query LeavesQuery($userId: Int!) {
    leaves: leavesByUserId(userId: $userId) {
      id,
      status,
      employeeComment,
      approverComment,
      dateStart,
      dateEnd,
      approver{
        firstName,
        lastName
      },
      leaveType{
        id,
        name,
        color,
        limit
      }
    },
    user: user(id: $userId){
      department{
        id,
        name,
        allowance,
        isAccruedAllowance
      },
      allowanceAdjustment{
        id,
        year,
        adjustment,
        carriedOverAllowance
      },
    },
    leaveTypes: leaveTypes{
      id,
      name,
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

  const {allowanceAdjustment} = user;

  return <Calendar
    leaves={leaves}
    department={user.department}
    allowanceAdjustment={allowanceAdjustment}
    leaveTypes={leaveTypes}
  />
}
