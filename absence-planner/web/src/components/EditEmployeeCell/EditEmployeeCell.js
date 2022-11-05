import EditEmployee from "src/components/EditEmployee"

export const beforeQuery = ({ id }) => ({
  variables: { id }
})

export const QUERY = gql`
  query FindEmployeeQuery($id: Int!) {
    user: user(id: $id) {
      id,
      firstName,
      lastName
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ user }) => {
  return <EditEmployee user={user} />
}
