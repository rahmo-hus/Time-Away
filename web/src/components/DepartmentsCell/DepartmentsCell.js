import { Link, routes } from '@redwoodjs/router'

import Departments from 'src/components/Departments'

export const QUERY = gql`
  query FindDepartmentsQuery($companyId: Int!) {
    company: company(id: $companyId) {
      departments {
        id
        name
        departmentSupervisor {
          user {
            id
            firstName
            lastName
          }
        }
        allowance
        numberOfEmployees
        includePublicHolidays
      }
    }
  }
`

export const Loading = () => <div className="loader"></div>

export const Empty = () => (
  <div>
    <h1>Departments</h1>

    <div className="row">
      <div className="col-md-4 lead">No department records</div>
      <div className="col-md-4 col-md-offset-4">
        <Link className="btn btn-info pull-right" to={routes.addDepartment()}>
          {' '}
          Add new department
        </Link>
      </div>
    </div>
  </div>
)

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ company }) => {
  const { departments } = company
  return (
    <>
      <h1>Departments</h1>

      <div className="row">
        <div className="col-md-4 lead">All departments</div>
        <div className="col-md-4 col-md-offset-4">
          <Link className="btn btn-info pull-right" to={routes.addDepartment()}>
            {' '}
            Add new department
          </Link>
        </div>
      </div>
      <Departments departments={departments} />
    </>
  )
}
