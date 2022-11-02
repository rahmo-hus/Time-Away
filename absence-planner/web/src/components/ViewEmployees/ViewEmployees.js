import { useEffect } from 'react'

const ViewEmployees = ({ employees, company, departments }) => {

  useEffect(() => {
    console.log(employees);
  });

  return (
    <div>
      <h1>Staff</h1>

      <div className="row">
        <div className="col-md-3 lead">{company.name}'s staff</div>
        <div className="col-md-3 col-md-offset-6">
          <div className="btn-group pull-right">
            <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Add new employee
              <span className="caret"></span>
              <span className="sr-only">Toggle Dropdown</span>
            </button>
            <ul className="dropdown-menu">
              <li><a href="/users/import/" id="import_users_btn">Import employees</a></li>
              <li><a href="/users/add/" id="add_new_department">Add single employee</a></li>
            </ul>
          </div>
          {/* <Form action="/users/" method="GET">
            <input type="hidden" name="department" value="{{department_id}}">
              <input type="hidden" name="as-csv" value="1">
                <button
                  className="btn btn-link pull-right single-click"
                  type="submit"
                  data-content="Download current page as .CSV file"
                  data-placement="top"
                  data-toggle="popover"
                  data-trigger="focus hover"
                ><i className="fa fa-download"></i> .csv</button>
              </form> */}
        </div>
      </div>

      <div className="row">&nbsp;</div>

      <div className="col-md-3 list-group all-departments">
        <a href="/users/" className="list-group-item{{#unless department_id }} selected-item{{/unless}}">All departments</a>

        <a className="list-group-item {{#if_equal ../department_id this.id}} selected-item{{/if_equal}}" href="/users/?department={{this.id}}"></a>

      </div>

      <div className="col-md-9">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Is Manager?</th>
              <th>Available allowance</th>
              <th>Days used</th>
            </tr>
          </thead>
          <tbody>
            {
              employees.map((employee) => (
                <tr data-vpp-user-row={employee.id}>
                  <td className="user-link-cell"><a href="/users/edit/{{this.user_id}}/">
                    {
                      !employee.isActivated ? <s>{employee.firstName} {employee.lastName}</s>:
                      <div>{employee.firstName} {employee.lastName}</div>
                    }</a></td>
                  <td className="user_department"><a href="/settings/departments/edit/{{ this.department_id }}/">{employee.department ? employee.department.name : ''}</a></td>
                  <td>{employee.isAdmin ? "Yes" : "No"}</td>
                  <td className="vpp-days-remaining">{employee.department ? employee.department.allowance : ''}</td>
                  <td className="vpp-days-used">Days taken </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default ViewEmployees
