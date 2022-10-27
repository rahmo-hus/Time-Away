import NewAbsence from "src/components/NewAbsence"

export const QUERY = gql`
  query UsersQuery {
    users {
      id,
      firstName,
      lastName
    },
    leaveTypes{
      id,
      name,
      color
    }
  }
`
export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ users, leaveTypes }) => {
  return <div><NewAbsence users={users} leaveTypes={leaveTypes}/></div>
}
