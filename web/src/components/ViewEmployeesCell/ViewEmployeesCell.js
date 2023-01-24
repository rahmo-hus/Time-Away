import ViewEmployees from 'src/components/ViewEmployees'

export const beforeQuery = ({ companyId }) => ({
  variables: { companyId },
})

export const QUERY = gql`
  query ViewEmployeesQuery($companyId: Int!) {
    company: company(id: $companyId) {
      name
      employees {
        id
        firstName
        lastName
        email
        isActivated
        isAdmin
        allLeaves {
          id
          status
          dateStart
          dateEnd
          deductedDays
          leaveType {
            useAllowance
          }
        }
        allowanceAdjustment {
          id
          year
          adjustment
          carriedOverAllowance
        }
        department {
          id
          name
          allowance
        }
      }
    }
    departments: departmentsByCompanyId(companyId: $companyId) {
      id
      name
    }
  }
`

export const Loading = () => <div className="loader"></div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ company, departments }) => {
  const { employees } = company
  return (
    <ViewEmployees
      employees={employees}
      company={company}
      departments={departments}
    />
  )
}
