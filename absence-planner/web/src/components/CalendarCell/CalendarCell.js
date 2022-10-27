import Calendar from "src/components/Calendar"

export const beforeQuery = ({userId}) => ({
    variables: {userId}
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
        allowance
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

// export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ leaves, user }) => {
  return <div><Calendar leaves = {leaves} department={user.department}/></div>
}
