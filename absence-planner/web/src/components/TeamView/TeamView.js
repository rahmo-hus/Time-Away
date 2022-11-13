import {
  FieldError,
  Form,
  Label,
  TextField,
  FormError,
  MonthField,
  SelectField,
  Submit,
  CheckboxField
} from '@redwoodjs/forms'
import { routes, Link } from '@redwoodjs/router'
import CalendarBody from 'src/components/CalendarBody'
import { useState } from 'react'
import { useAuth } from '@redwoodjs/auth'

const TeamView = ({ users, departments }) => {

  const formatDate = (date) => {
    return date.toISOString().slice(0, 7);
  }

  const { currentUser } = useAuth();
  const [selectedMonth, setSelectedMonth] = useState(formatDate(new Date()));
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const weekDays = ["Su", "M", "Tu", "W", "Th", "F", "Sa"];
  const [selectedDepartment, setSelectedDepartment] = useState(0);


  const getPreviousMonth = () => {
    const month = new Date(selectedMonth);
    if (month.getMonth() === 0) {
      return months[11] + ' ' + (month.getFullYear() - 1);
    }
    return months[month.getMonth() - 1];
  }

  const getNextMonth = () => {
    const month = new Date(selectedMonth);
    if (month.getMonth() === 11) {
      return months[0] + ' ' + (month.getFullYear() + 1);
    }
    return months[month.getMonth() + 1];
  }

  const setMonth = (direction) => {
    const currentMonth = new Date(selectedMonth);
    if (direction === 'UP') {
      if (currentMonth.getMonth() === 11) {
        const nextYear = currentMonth.getFullYear() + 1;
        setSelectedMonth(formatDate(new Date(nextYear, 1, 1)));
      }
      else {
        setSelectedMonth(formatDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 2, 1)));
      }
    }
    else if (direction === 'DOWN') {
      if (currentMonth.getMonth() === 0) {
        const previousYear = currentMonth.getFullYear() - 1;
        setSelectedMonth(formatDate(new Date(previousYear, 12, 1)));
      }
      else {
        setSelectedMonth(formatDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)));
      }
    }
  }

  const getCalendar = (year, month) => {
    const currentDate = new Date(year, month, 1);
    const calendar = [];
    while (currentDate.getMonth() === month) {
      calendar.push(new Date(currentDate).getDate());
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return calendar;
  }

  const isLeaveCell = (date, user) => {
    for (let i = 0; i < user?.approvedLeaves?.length; i++){
      if (date >= new Date(user?.approvedLeaves[i].dateStart.split('T')[0]) && date <= new Date(user?.approvedLeaves[i].dateEnd.split('T')[0]))
        return user?.approvedLeaves[i].leaveType.name;
    }
    return null;
  }

  const getDateInGeneralFormat = (selectedMonth, day) =>{
    return new Date(new Date(selectedMonth).getFullYear(), new Date(selectedMonth).getMonth(), day);
  }

  const TableBody = () => {
    const filteredUsers = selectedDepartment === 0 ? users : users.filter((user) => user?.department?.id === selectedDepartment);
    return filteredUsers.map((user) => (
      <React.Fragment key={user.id}>
        <tbody>
          <tr className="teamview-user-list-row">
            <td className="left-column-cell cross-link user-details-summary-trigger">
              <Link to={routes.editEmployee({ id: user.id })}>{user.firstName} {user.lastName}</Link>
            </td>
            {
              getCalendar(new Date(selectedMonth).getFullYear(), new Date(selectedMonth).getMonth()).map((day, key) => (
                <React.Fragment key={key}>
                  <CalendarBody data={{ day: day, weekend: weekDays[getDateInGeneralFormat(selectedMonth, day).getDay()].match('Sa|Su'), leave: isLeaveCell(getDateInGeneralFormat(selectedMonth, day), user) }} />
                </React.Fragment>
              ))
            }
          </tr>
        </tbody>
      </React.Fragment>
    ))
  }

  return (
    <div>
      <div className="row">&nbsp;</div>
      <h1>Team View</h1>
      <div className="row">
        <div className="col-md-6 lead">{currentUser.firstName} {currentUser.lastName}'s team </div>
      </div>

      <nav>
        <div className="row">
          <Form>
            <div className="col-xs-2">
              <button className="btn btn-link btn-lg" onClick={() => setMonth('DOWN')}><span aria-hidden="true" className="fa fa-chevron-left"></span> {getPreviousMonth()}</button>
            </div>

            <div className="col-xs-8 calendar-section-caption">
              <MonthField name="date" value={selectedMonth} onChange={(event) => setSelectedMonth(event.target.value)} className="btn btn-link btn-lg"></MonthField>
            </div>

            <div className="col-xs-2">
              <button className="btn btn-link btn-lg pull-right" onClick={() => setMonth('UP')}>{getNextMonth()} <span aria-hidden="true" className="fa fa-chevron-right"></span></button>
            </div>

            <div className="row clearfix">
              <div className="col-md-12">
                <table className="team-view-table table-hover">
                  <thead>
                    <tr>
                      <td className="team-view-header" colSpan="1">
                        <div className="dropdown pull-left">
                          <button className="btn btn-default dropdown-toggle left-column-cell" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                            {selectedDepartment === 0 ? "All departments" : departments.filter(d => d.id === selectedDepartment)[0].name}
                            <span className="caret"></span>
                          </button>
                          <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                            <li><a onClick={() => setSelectedDepartment(0)}>All</a></li>
                            <li role="separator" className="divider"></li>
                            {
                              departments.map((department)=>(
                                <li key={department.id}>
                                  <a onClick={() => setSelectedDepartment(department.id)}>{department.name}</a>
                                </li>
                              ))
                            }
                          </ul>
                        </div>
                      </td>
                      {
                        getCalendar(new Date(selectedMonth).getFullYear(), new Date(selectedMonth).getMonth()).map((day, key) => (
                          <React.Fragment key={key}>
                            <td colSpan="2" className="team-view-header"><b>{weekDays[new Date(new Date(selectedMonth).getFullYear(), new Date(selectedMonth).getMonth(), day).getDay()]}</b></td>
                          </React.Fragment>
                        ))
                      }
                    </tr>
                  </thead>

                  <TableBody />

                </table>
              </div>
            </div>
          </Form>
        </div>
      </nav>
    </div>
  )
}

export default TeamView
