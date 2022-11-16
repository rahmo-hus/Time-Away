import AddEmployee from "src/components/AddEmployee"

export const beforeQuery = ({ userId }) => ({
  variables: { userId }
})

export const QUERY = gql`
  query UserQuery($userId: Int!) {
    user: user(id: $userId){
      company{
        id,
        departments{
          id,
          name
        }
      }
  }
}
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ user }) => {
  return <AddEmployee data={user} />
}
