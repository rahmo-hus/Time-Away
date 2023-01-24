/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Fragment, useEffect, useState } from 'react'

import { DateField, Form, Label, TextField } from '@redwoodjs/forms'
import { Link, routes } from '@redwoodjs/router'

import CalendarBody from 'src/components/CalendarBody'

const Holidays = ({ company }) => {
  const { holidays } = company

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

  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [previousYear, setPreviousYear] = useState(null)
  const [nextYear, setNextYear] = useState(null)
  const [currentHolidays, setCurrentHolidays] = useState([])
  const weekDays = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa']

  useEffect(() => {
    const filteredHolidays = holidays.filter(
      (holiday) => new Date(holiday.date).getFullYear() === currentYear
    )
    setCurrentHolidays([...filteredHolidays])
    setNextYear(currentYear + 1)
    setPreviousYear(currentYear - 1)
  }, [currentYear])

  const removeHoliday = (id) => {
    const localHolidays = [...currentHolidays]
    const index = localHolidays.map((holiday) => holiday.id).indexOf(id)
    localHolidays.splice(index, 1)
    setCurrentHolidays(localHolidays)
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
  const getCalendar = (year, month) => {
    let calendar = {
      year: year,
      month: month,
      weeks: getMonthDays(year, month),
    }

    return calendar
  }

  const isLeaveCell = (year, month, day) => {
    for (let i = 0; i < holidays.length; i++) {
      if (
        new Date(holidays[i].date).getFullYear() === year &&
        new Date(holidays[i].date).getMonth() === month - 1 &&
        new Date(holidays[i].date).getUTCDate() === parseInt(day)
      ) {
        return {
          status: 0,
          leaveType: {
            name: holidays[i].name,
            color: 7,
          },
        }
      }
    }
    return null
  }

  const getYearsAndMonths = () => {
    const data = []
    let year = new Date().getFullYear()
    let month = new Date().getMonth()

    year = currentYear
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

    return data
  }

  return (
    <div>
      <div className="text-center">
        <h1>Holidays</h1>
        <div className="lead">Public holidays for {company.name}</div>
        <hr></hr>
      </div>

      <div className="row">&nbsp;</div>

      <div className="row">
        <div className="col-xs-2">
          <a
            className="btn btn-default"
            onClick={() => {
              console.log(currentYear)
              setCurrentYear(currentYear - 1)
            }}
          >
            <span aria-hidden="true" className="fa fa-chevron-left"></span>{' '}
            {previousYear}
          </a>
        </div>
        <div className="col-xs-8 calendar-section-caption">
          <strong>January - December {currentYear}</strong>
        </div>
        <div className="col-xs-2">
          <a
            className="btn btn-default pull-right"
            onClick={() => {
              setCurrentYear(currentYear + 1)
            }}
          >
            {nextYear}
            <span aria-hidden="true" className="fa fa-chevron-right"></span>
          </a>
        </div>
      </div>

      <div className="row">&nbsp;</div>

      <div className="row clearfix">
        <div className="col-md-8">
          <div className="row">
            {getYearsAndMonths().map((data, key) => (
              <Fragment key={key}>
                <div className="col-md-4 month_container">
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
                          <Fragment key={key}>
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
                          </Fragment>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </Fragment>
            ))}
          </div>
        </div>

        <Form>
          <div className="col-md-4">
            <div className="row">
              <div className="col-md-5">
                <Label name="a" className="control-label">
                  Date
                </Label>
              </div>
              <div className="col-md-5">
                <Label name="date" className="control-label">
                  Holiday Name
                </Label>
              </div>
            </div>

            <div className="row">&nbsp;</div>

            {!currentHolidays || currentHolidays.length === 0 ? (
              <div className="row">
                <div className="col-md-12 tst-no-bank-holidays text-center">
                  No holiday records for this year
                </div>
                <br></br>
              </div>
            ) : (
              currentHolidays.map((holiday) => (
                <div key={holiday.id} className="row">
                  <div className="col-md-5">
                    <div className="input-append date">
                      <DateField
                        class="form-control"
                        name={'date_' + holiday.id}
                        value={holiday.date.split('T')[0]}
                        defaultValue={holiday.date.split('T')[0]}
                      />
                      <span className="add-on">
                        <i className="icon-th"></i>
                      </span>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <TextField
                      type="text"
                      class="form-control"
                      value={holiday.name}
                      name={'name_' + holiday.id}
                    />
                  </div>
                  <div className="col-md-2">
                    <button
                      className="btn btn-default pull-right bankholiday-remove-btn"
                      type="button"
                      onClick={() => removeHoliday(holiday.id)}
                      value={holiday.id}
                    >
                      <span className="fa fa-remove"></span>
                    </button>
                  </div>
                  <div>&nbsp;</div>
                </div>
              ))
            )}
            <div className="row">
              <div className="col-md-12">
                <div className="pull-right">
                  <Link
                    className="btn btn-success single-click"
                    type="button"
                    to={routes.newHoliday()}
                  >
                    Add new
                  </Link>
                  <button className="btn btn-default">Apply changes</button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </div>

      <div className="row">&nbsp;</div>

      <div className="row">&nbsp;</div>
    </div>
  )
}

export default Holidays
