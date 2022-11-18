import { useState, useEffect } from 'react'

import { Label, Form, CheckboxField } from '@redwoodjs/forms'

const Schedule = ({ user }) => {
  const [schedule, setSchedule] = useState({
    monday: 1,
    tuesday: 1,
    wednesday: 1,
    thursday: 1,
    friday: 1,
    saturday: 0,
    sunday: 0,
  })

  useEffect(() => {
    if (user.schedule) {
      setSchedule(user.schedule)
    }
  }, [user.schedule])

  const onSubmit = (input) => {
    console.log(input)
  }

  return (
    <div>
      <div className="col-md-9">
        <Form onSubmit={onSubmit}>
          <div className="form-group">
            <Label className="control-label">Schedule</Label>
            {user.schedule ? (
              <p className="help-block">
                Current employee has{' '}
                <strong data-vpp="declare-user-specific-schedule">
                  custom
                </strong>{' '}
                schedule.
              </p>
            ) : (
              <p>
                Current employee uses{' '}
                <strong>
                  <button className="link">company wide</button>
                </strong>{' '}
                schedule.
              </p>
            )}

            <div className="input-group">
              <div className="btn-group" data-toggle="buttons">
                <Label
                  className={
                    'btn btn-default ' + (schedule.monday === 1 ? 'active' : '')
                  }
                >
                  {schedule.monday === 1 ? (
                    <CheckboxField name="monday" checked />
                  ) : (
                    <CheckboxField name="monday" />
                  )}
                  Mon
                </Label>
                <Label
                  className={
                    'btn btn-default ' +
                    (schedule.tuesday === 1 ? 'active' : '')
                  }
                >
                  {schedule.tuesday === 1 ? (
                    <CheckboxField name="tuesday" checked />
                  ) : (
                    <CheckboxField name="tuesday" />
                  )}
                  Tue
                </Label>
                <Label
                  className={
                    'btn btn-default ' +
                    (schedule.wednesday === 1 ? 'active' : '')
                  }
                >
                  {schedule.wednesday === 1 ? (
                    <CheckboxField name="wednesday" checked />
                  ) : (
                    <CheckboxField name="wednesday" />
                  )}
                  Wed
                </Label>
                <Label
                  className={
                    'btn btn-default ' +
                    (schedule.thursday === 1 ? 'active' : '')
                  }
                >
                  {schedule.thursday === 1 ? (
                    <CheckboxField name="thursday" checked />
                  ) : (
                    <CheckboxField name="thursday" />
                  )}
                  Thu
                </Label>
                <Label
                  className={
                    'btn btn-default ' + (schedule.friday === 1 ? 'active' : '')
                  }
                >
                  {schedule.friday === 1 ? (
                    <CheckboxField name="friday" checked />
                  ) : (
                    <CheckboxField name="friday" />
                  )}
                  Fri
                </Label>
                <Label
                  className={
                    'btn btn-default ' +
                    (schedule.saturday === 1 ? 'active' : '')
                  }
                >
                  {schedule.saturday === 1 ? (
                    <CheckboxField name="saturday" checked />
                  ) : (
                    <CheckboxField name="saturday" />
                  )}
                  Sat
                </Label>
                <Label
                  className={
                    'btn btn-default ' + (schedule.sunday === 1 ? 'active' : '')
                  }
                >
                  {schedule.sunday === 1 ? (
                    <CheckboxField name="sunday" checked />
                  ) : (
                    <CheckboxField name="sunday" />
                  )}
                  Sun
                </Label>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="pull-right">
              {user.schedule ? (
                <>
                  <button
                    type="submit"
                    name="revoke_user_specific_schedule"
                    className="btn btn-default"
                  >
                    Move employee to company wide schedule
                  </button>
                  <button
                    type="submit"
                    name="save_user_specific_schedule"
                    className="btn btn-success"
                  >
                    Save employee specific schedule
                  </button>
                </>
              ) : (
                <button
                  type="submit"
                  name="save_user_specific_schedule"
                  className="btn btn-success"
                >
                  Override company wide schedule
                </button>
              )}
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Schedule
