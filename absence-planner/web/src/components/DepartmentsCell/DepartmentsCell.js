import Departments from "src/components/Departments"

export const QUERY = gql`
  query FindDepartmentsQuery {
    departments {
      id,
      name,
      departmentSupervisor{
        user{
          firstName,
          lastName
        }
      },
      allowance,
      numberOfEmployees,
      includePublicHolidays
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ departments }) => {
  return <Departments departments = {departments}/>
}
