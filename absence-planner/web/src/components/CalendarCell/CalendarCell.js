import Calendar from "src/components/Calendar"

export const QUERY = gql`
  query CompaniesQuery {
    calendar: companies {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ calendar }) => {
  return <div><Calendar/></div>
}
