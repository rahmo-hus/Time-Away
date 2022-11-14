export const QUERY = gql`
  query FindEditDepartmentQuery($id: Int!) {
    department: department(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ editDepartment }) => {
  return <div>{JSON.stringify(editDepartment)}</div>
}
