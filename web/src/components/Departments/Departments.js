/* eslint-disable react/jsx-no-undef */
import { routes, Link } from '@redwoodjs/router'

const Departments = ({ departments }) => {
  return (
    <div>
      <div className="row">&nbsp;</div>
      <div className="row">
        <div className="col-md-12">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Manager</th>
                <th>Allowance</th>
                <th>Number of employees</th>
                <th>
                  Public Holidays
                  <button
                    type="button"
                    className="btn btn-xs btn-link"
                    data-trigger="focus hover"
                  >
                    <span className="fa fa-question-circle"> </span>
                  </button>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {departments.map((department) => (
                <React.Fragment key={department.id}>
                  <tr data-vpp-department-list-mode="readonly">
                    <td>
                      <Link to={routes.editDepartment({ id: department.id })}>
                        {department.name}
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={routes.editEmployee({
                          id: department.departmentSupervisor?.user?.id,
                        })}
                      >
                        {department.departmentSupervisor?.user?.firstName}{' '}
                        {department.departmentSupervisor?.user?.lastName}
                      </Link>
                    </td>
                    <td>{department.allowance}</td>
                    <td>{department.numberOfEmployees}</td>
                    <td>{department.includePublicHolidays ? 'Yes' : 'No'}</td>

                    <td>
                      <Link
                        to={routes.editDepartment({ id: department.id })}
                        className="btn btn-link btn-xs pull-right"
                      >
                        <span className="fa fa-chevron-right"></span>
                      </Link>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Departments
