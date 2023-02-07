import Holidays from 'src/components/Holidays'

export const QUERY = gql`
  query BankHolidaysQuery($companyId: Int!) {
    company(id: $companyId) {
      id
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
  }
`

export const Loading = () => <div className="loader"></div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ company }) => {
  return (
    <>
      <Holidays company={company} />
    </>
  )
}
