/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-undef */
import { useEffect, useState, Fragment } from 'react'

import { useAuth } from '@redwoodjs/auth'

import AllowanceBreakdown from 'src/components/AllowanceBreakdown'
import CalendarBody from 'src/components/CalendarBody'

const AbsenceDetails = ({
  allowanceAdjustment,
  leaveTypes,
  department,
  leaves,
}) => {
  const { hasRole } = useAuth()
  const [showFullYear, setShowFullYear] = useState(false)
  const [currentYear, setCurrentYear] = useState(new Date())
  const [previousYear, setPreviousYear] = useState(null)
  const [nextYear, setNextYear] = useState(null)
  const weekDays = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa']
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  useEffect(() => {
    setNextYear(currentYear.getFullYear() + 1)
    setPreviousYear(currentYear.getFullYear() - 1)
  }, [currentYear])

  const getCalendar = (year, month) => {
    let calendar = {
      year: year,
      month: month,
      weeks: getMonthDays(year, month),
    }

    return calendar
  }

  const calculateDaysTaken = () => {
    let total = 0
    for (let i = 0; i < leaves.length; i++) {
      total +=
        leaves[i].leaveType?.useAllowance === true ? leaves[i].deductedDays : 0
    }
    return total
  }

  const calculateDaysTakenForLeaveTypeName = (name) => {
    return leaves
      .filter(
        (leave) =>
          (leave.status === 2 || leave.status === 4) &&
          leave?.leaveType.name === name
      )
      .reduce((accumulator, leave) => accumulator + leave.deductedDays, 0)
  }

  const getMonthDays = (year, month) => {
    let date = 1
    const days = []
    while (
      !isNaN(new Date(year + '-' + month + '-' + date).getDate()) &&
      new Date(year + '-' + month + '-' + date).getDate() === date
    ) {
      days.push(
        date +
          '-' +
          weekDays[new Date(year + '-' + month + '-' + date).getDay()]
      )
      date += 1
    }

    const weeks = []
    var week = {
      Su: null,
      M: null,
      Tu: null,
      W: null,
      Th: null,
      F: null,
      Sa: null,
    }

    for (let i = 0; i < days.length; i++) {
      const weekDay = days[i].split('-')[1]
      date = days[i].split('-')[0]
      week[weekDay] = date
      if (weekDay === 'Su') {
        weeks.push(week)
        week = {
          Su: null,
          M: null,
          Tu: null,
          W: null,
          Th: null,
          F: null,
          Sa: null,
        }
      }
    }

    if (week.M || week.F || week.Sa || week.W || week.Tu || week.Th || week.Su)
      weeks.push(week)

    return weeks
  }

  const getYearsAndMonths = () => {
    const data = []
    let year = new Date().getFullYear()
    let month = new Date().getMonth()

    if (!showFullYear) {
      for (let i = 0; i < 4; i++) {
        if (month === 12) {
          month = 1
          year += 1
          data.push({ month: month, year: year })
        } else {
          data.push({ month: month + 1, year: year })
          month++
        }
      }
    } else {
      year = currentYear.getFullYear()
      month = 0
      for (let i = 0; i < 12; i++) {
        if (month === 12) {
          month = 0
          year += 1
          data.push({ month: month + 1, year: year })
        } else {
          data.push({ month: month + 1, year: year })
          month++
        }
      }
    }
    return data
  }

  const returnZeroIfValueIsNull = (val) => {
    return val ? val : 0
  }

  const calculateTotalAvailableAllowance = () => {
    return (
      returnZeroIfValueIsNull(department?.allowance) +
      returnZeroIfValueIsNull(allowanceAdjustment?.adjustment) +
      returnZeroIfValueIsNull(allowanceAdjustment?.carriedOverAllowance)
    )
  }

  const isLeaveCell = (year, month, day) => {
    if (day) {
      const date = new Date(year, month - 1, parseInt(day), 1, 0, 0, 0)
      for (let i = 0; i < leaves.length; i++) {
        if (
          date >= new Date(leaves[i].dateStart.split('T')[0]) &&
          date <= new Date(leaves[i].dateEnd.split('T')[0])
        ) {
          return leaves[i]
        }
      }
    }
    return null
  }

  return (
    <>
      <div>
        <div className="flex-center">
          <div className="col-md-4 secondary-leave-type-statistics hidden-xs">
            <AllowanceBreakdown
              allowanceDetails={{
                isAccruedAllowance: returnZeroIfValueIsNull(
                  department?.isAccruedAllowance
                ),
                daysTaken: calculateDaysTaken(),
                nominalAllowance: returnZeroIfValueIsNull(
                  department?.allowance
                ),
                ...allowanceAdjustment,
              }}
            />
          </div>

          <div className="col-md-3 secondary-leave-type-statistics hidden-xs">
            <dl>
              <dt>Used so far</dt>
              {leaveTypes.map((leaveType) => (
                // eslint-disable-next-line react/jsx-no-undef
                <React.Fragment key={leaveType.id}>
                  <dd>
                    <em> {leaveType.name}</em>
                    <span className="pull-right">
                      {calculateDaysTakenForLeaveTypeName(leaveType.name)} out
                      of {leaveType.limit}
                    </span>
                  </dd>
                </React.Fragment>
              ))}
              {!hasRole('manager') && (
                <dd className="text-muted">No approved requests so far.</dd>
              )}
            </dl>
          </div>

          <div className="col-md-3 secondary-leave-type-statistics hidden-xs">
            <dl>
              <dt>Details</dt>
              <dd>
                <em>Department:</em>{' '}
                <span className="pull-right">
                  <a href="/calendar/teamview/?department={{ current_user.department.id }}">
                    {department ? department.name : 'N/A'}
                  </a>
                </span>
              </dd>
              <dd>
                <em>Allowance in 2022:</em>
                <span className="pull-right">
                  {' '}
                  {calculateTotalAvailableAllowance()}
                </span>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className="row"></div>
      <div className="row main-row_header">
        <div className="col-md-12">Calendar </div>
      </div>
      <div className="row">
        <div className="flex-center">
          <div className="col-xs-2">
            {showFullYear && (
              <button
                className="btn btn-default"
                onClick={() =>
                  setCurrentYear(new Date(currentYear.getFullYear() - 1, 1, 1))
                }
              >
                <span aria-hidden="true" className="fa fa-chevron-left"></span>{' '}
                {previousYear}{' '}
              </button>
            )}
          </div>
          <div className="col-xs-8 calendar-section-caption">
            {showFullYear ? (
              <strong>January - December {currentYear.getFullYear()}</strong>
            ) : (
              <strong>Show entire year</strong>
            )}
            &nbsp;
            {!showFullYear ? (
              <button
                className="btn btn-default"
                onClick={() => setShowFullYear(true)}
              >
                More... &nbsp;<span className="fa fa-plus"></span>
              </button>
            ) : (
              <button
                className="btn btn-default"
                onClick={() => setShowFullYear(false)}
              >
                Less... &nbsp;<span className="fa fa-minus"></span>
              </button>
            )}
          </div>
          <div className="col-xs-2">
            {showFullYear && (
              <button
                className="btn btn-default pull-right"
                onClick={() =>
                  setCurrentYear(new Date(currentYear.getFullYear() + 1, 1, 1))
                }
              >
                {nextYear}{' '}
                <span aria-hidden="true" className="fa fa-chevron-right"></span>
              </button>
            )}
          </div>
        </div>

        <div className="row">&nbsp;</div>
        <div className="row clearfix">
          {getYearsAndMonths().map((data, key) => (
            <React.Fragment key={key}>
              <div className="col-md-3 month_container">
                <table
                  className={'calendar_month month_' + months[data.month - 1]}
                >
                  <thead>
                    <tr>
                      <td colSpan="14">
                        {months[data.month - 1]}, {data.year}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">M</td>
                      <td colSpan="2">T</td>
                      <td colSpan="2">W</td>
                      <td colSpan="2">T</td>
                      <td colSpan="2">F</td>
                      <td colSpan="2">S</td>
                      <td colSpan="2">S</td>
                    </tr>
                  </thead>
                  <tbody>
                    {getCalendar(data.year, data.month).weeks.map(
                      (week, key) => (
                        <React.Fragment key={key}>
                          <tr>
                            <CalendarBody
                              data={{
                                day: week.M,
                                leave: isLeaveCell(
                                  data.year,
                                  data.month,
                                  week.M
                                ),
                              }}
                            ></CalendarBody>
                            <CalendarBody
                              data={{
                                day: week.Tu,
                                leave: isLeaveCell(
                                  data.year,
                                  data.month,
                                  week.Tu
                                ),
                              }}
                            ></CalendarBody>
                            <CalendarBody
                              data={{
                                day: week.W,
                                leave: isLeaveCell(
                                  data.year,
                                  data.month,
                                  week.W
                                ),
                              }}
                            ></CalendarBody>
                            <CalendarBody
                              data={{
                                day: week.Th,
                                leave: isLeaveCell(
                                  data.year,
                                  data.month,
                                  week.Th
                                ),
                              }}
                            ></CalendarBody>
                            <CalendarBody
                              data={{
                                day: week.F,
                                leave: isLeaveCell(
                                  data.year,
                                  data.month,
                                  week.F
                                ),
                              }}
                            ></CalendarBody>
                            <CalendarBody
                              data={{ day: week.Sa, weekend: true }}
                            ></CalendarBody>
                            <CalendarBody
                              data={{ day: week.Su, weekend: true }}
                            ></CalendarBody>
                          </tr>
                        </React.Fragment>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
      {showFullYear && (
        <div className="row main-row_header">
          <p className="col-md-12">All my absences in 2022</p>
        </div>
      )}
    </>
  )
}

export default AbsenceDetails
