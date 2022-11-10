import { useEffect, useState } from 'react'
import {Link, routes} from '@redwoodjs/router'

const ViewEmployees = ({ employees, company, departments }) => {

  const [selectedDepartment, setSelectedDepartment] = useState(0);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loadIn, setLoadIn] = useState(false);

  useEffect(() => {
    if (loadIn === false) {
      setFilteredEmployees(employees);
      setLoadIn(true);
    }
  });

  useEffect(() => {
    if (filteredEmployees !== null) {
      if (selectedDepartment === 0) {
        setFilteredEmployees(employees)
      } else {
        const localFilteredEmployees = employees.filter(employee => employee.department ? (employee.department.id === selectedDepartment) : false);
        setFilteredEmployees(localFilteredEmployees);
      }
    }
  }, [selectedDepartment]);

  const returnZeroIfValueIsNull = val => {
    return val ? val : 0;
  }

  const calculateTotalAllowance = (employee) => {
    return employee?.department.allowance + returnZeroIfValueIsNull(employee?.allowanceAdjustment?.adjustment) + returnZeroIfValueIsNull(employee?.allowanceAdjustment?.carriedOverAllowance);
  }

  const calculateDaysTaken = (approvedLeaves) => {
    let total = 0;
    for (let i = 0; i < approvedLeaves.length; i++) {
      const diffTime = Math.abs(new Date(approvedLeaves[i].dateEnd) - new Date(approvedLeaves[i].dateStart));
      total += parseInt(Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    }
    return total;
  }

  return (
    <div>
      <h1>Staff</h1>

      <div className="row">
        <div className="col-md-3 lead">{company.name}'s staff</div>
        <div className="col-md-3 col-md-offset-6">
          <div className="btn-group pull-right">
            <Link className="button" to={routes.addEmployee()}>Add single employee</Link>
          </div>
        </div>
      </div>

      <div className="row">&nbsp;</div>

      <div className="col-md-3 list-group all-departments">
        <button onClick={() => setSelectedDepartment(0)} className={'list-group-item ' + (selectedDepartment === 0 ? 'selected-item' : '')}>All departments</button>
        {
          departments.map((department) => (
            <React.Fragment key={department.id}>
              <button onClick={() => setSelectedDepartment(department.id)} className={'list-group-item ' + (selectedDepartment === department.id ? 'selected-item' : '')}>
                {department.name}
              </button>
            </React.Fragment>
          ))
        }
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
              filteredEmployees.map((employee) => (
                <React.Fragment key={employee.id}>
                  <tr data-vpp-user-row={employee.id}>
                    <td className="user-link-cell"><Link to={routes.editEmployee({id: employee.id})}>
                      {
                        !employee.isActivated ? <s>{employee.firstName} {employee.lastName}</s> :
                          <div>{employee.firstName} {employee.lastName}</div>
                      }</Link></td>
                    <td className="user_department"><a href="/settings/departments/edit/{{ this.department_id }}/">{employee.department ? employee.department.name : ''}</a></td>
                    <td>{employee.isAdmin ? "Yes" : "No"}</td>
                    <td className="vpp-days-remaining">{calculateTotalAllowance(employee) - calculateDaysTaken(employee.approvedLeaves)}</td>
                    <td className="vpp-days-used">{calculateDaysTaken(employee.approvedLeaves)}</td>
                  </tr>
                </React.Fragment>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewEmployees
