import ViewEmployees from "src/components/ViewEmployees"

export const beforeQuery = ({ companyId }) => ({
  variables: { companyId }
})


export const QUERY = gql`
  query ViewEmployeesQuery($companyId: Int!) {
    users: usersByCompanyId(companyId: $companyId){
      id,
      firstName,
      lastName,
      email,
      isActivated,
      isAdmin,
      approvedLeaves{
        id,
        dateStart,
        dateEnd
      },
      allowanceAdjustment{
        id,
        year,
        adjustment,
        carriedOverAllowance
      },
      department{
        id,
        name,
        allowance
      }
    },
    company: company(id: $companyId){
      name
    },
    departments: departmentsByCompanyId(companyId: $companyId){
      id,
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ users, company, departments }) => {
  return (
    <ViewEmployees employees={users}
      company={company}
      departments={departments} />
  )
}
