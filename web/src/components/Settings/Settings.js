/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react'

import {
  Form,
  Label,
  TextField,
  SelectField,
  CheckboxField,
  Submit,
  NumberField,
} from '@redwoodjs/forms'
import { Link, routes } from '@redwoodjs/router'

import LeaveTypeInput from 'src/components/LeaveTypeInput'

const Settings = ({
  company,
  countries,
  updateCompanyDetails,
  schedule,
  overrideSchedule,
  onCarryOver,
  onLeaveChange,
  leaveTypes,
}) => {
  const [defaultSchedule, setSchedule] = useState({
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: false,
    sunday: false,
  })

  useEffect(() => {
    if (schedule) {
      setSchedule({
        monday: schedule.monday,
        tuesday: schedule.tuesday,
        wednesday: schedule.wednesday,
        thursday: schedule.thursday,
        friday: schedule.friday,
        saturday: schedule.saturday,
        sunday: schedule.sunday,
      })
    }
  }, [schedule])

  const onCompanyUpdate = (input) => {
    updateCompanyDetails({
      countryId: parseInt(input.country),
      carryOver: parseInt(input.carryOver),
      isTeamViewHidden: input.isTeamViewHidden,
      name: input.name,
      shareAllAbsences: input.shareAllAbsences,
    })
  }

  const onOverrideSchedule = () => {
    overrideSchedule(defaultSchedule)
  }

  return (
    <div>
      <h1 className="text-center">General settings</h1>

      <p className="lead text-center">Account main settings</p>

      <div className="row">&nbsp;</div>

      <div className="row">
        <div className="col-md-12">
          <div className="panel panel-default">
            <div className="panel-heading">Company</div>
            <div className="panel-body">
              <div className="row">
                <div className="col-md-5">
                  <Form className="form-horizontal" onSubmit={onCompanyUpdate}>
                    <div className="form-group">
                      <Label name="name" className="col-md-4 control-label">
                        Company name
                      </Label>
                      <div className="col-md-8">
                        <TextField
                          className="form-control"
                          placeholder="Our company name"
                          required
                          name="name"
                          defaultValue={company.name}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <Label name="country" className="col-md-4 control-label">
                        Country
                      </Label>
                      <div className="col-md-8">
                        <SelectField
                          defaultValue={company.countryId}
                          className="form-control"
                          name="country"
                        >
                          {countries.map((country) => (
                            <option key={country.id} value={country.id}>
                              {country.name}
                            </option>
                          ))}
                        </SelectField>
                      </div>
                    </div>

                    <div className="form-group">
                      <Label
                        name="carryOver"
                        className="col-md-4 control-label"
                      >
                        Carried over days
                      </Label>
                      <div className="col-md-8">
                        <NumberField
                          name="carryOver"
                          className="form-control"
                          min="0"
                          max="20"
                        ></NumberField>
                        <p>
                          <em>
                            Maximum number of days in employee allowance that
                            are carried over to the next year.
                          </em>
                        </p>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-md-offset-4 col-md-8">
                        <div className="checkbox">
                          <Label name="shareAllAbsences">
                            <CheckboxField
                              defaultChecked={company.shareAllAbsences}
                              style={{ marginTop: 0 }}
                              name="shareAllAbsences"
                            ></CheckboxField>
                            Share all absences
                          </Label>
                          <p>
                            <em>
                              If enabled all employees can see information about
                              everybodys absences regardless departments.
                            </em>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="col-md-offset-2 col-md-10">
                        <Submit className="btn btn-success pull-right single-click">
                          Save changes
                        </Submit>
                      </div>
                    </div>
                  </Form>
                </div>

                <div className="col-md-offset-1 col-md-5">
                  <Form
                    onSubmit={onOverrideSchedule}
                    className="form-horizontal"
                  >
                    <div className="form-group">
                      <Label
                        name="companySchedule"
                        className="col-md-6 control-label"
                      >
                        Company week schedule
                      </Label>
                    </div>
                    <div className="form-group">
                      <div className="col-md-offset-2">
                        <div className="btn-group" data-toggle="buttons">
                          <Label
                            onClick={() =>
                              (defaultSchedule.monday = !defaultSchedule.monday)
                            }
                            className={
                              'btn btn-default ' +
                              (defaultSchedule.monday ? 'active' : '')
                            }
                          >
                            {defaultSchedule.monday ? (
                              <CheckboxField name="monday" checked />
                            ) : (
                              <CheckboxField name="monday" />
                            )}
                            Mon
                          </Label>
                          <Label
                            onClick={() =>
                              (defaultSchedule.tuesday =
                                !defaultSchedule.tuesday)
                            }
                            className={
                              'btn btn-default ' +
                              (defaultSchedule.tuesday ? 'active' : '')
                            }
                          >
                            {defaultSchedule.tuesday ? (
                              <CheckboxField name="tuesday" checked />
                            ) : (
                              <CheckboxField name="tuesday" />
                            )}
                            Tue
                          </Label>
                          <Label
                            onClick={() =>
                              (defaultSchedule.wednesday =
                                !defaultSchedule.wednesday)
                            }
                            className={
                              'btn btn-default ' +
                              (defaultSchedule.wednesday ? 'active' : '')
                            }
                          >
                            {defaultSchedule.wednesday ? (
                              <CheckboxField name="wednesday" checked />
                            ) : (
                              <CheckboxField name="wednesday" />
                            )}
                            Wed
                          </Label>
                          <Label
                            onClick={() =>
                              (defaultSchedule.thursday =
                                !defaultSchedule.thursday)
                            }
                            className={
                              'btn btn-default ' +
                              (defaultSchedule.thursday ? 'active' : '')
                            }
                          >
                            {defaultSchedule.thursday ? (
                              <CheckboxField name="thursday" checked />
                            ) : (
                              <CheckboxField name="thursday" />
                            )}
                            Thu
                          </Label>
                          <Label
                            onClick={() =>
                              (defaultSchedule.friday = !defaultSchedule.friday)
                            }
                            className={
                              'btn btn-default ' +
                              (defaultSchedule.friday ? 'active' : '')
                            }
                          >
                            {defaultSchedule.friday ? (
                              <CheckboxField name="friday" checked />
                            ) : (
                              <CheckboxField name="friday" />
                            )}
                            Fri
                          </Label>
                          <Label
                            onClick={() =>
                              (defaultSchedule.saturday =
                                !defaultSchedule.saturday)
                            }
                            className={
                              'btn btn-default ' +
                              (defaultSchedule.saturday ? 'active' : '')
                            }
                          >
                            {defaultSchedule.saturday ? (
                              <CheckboxField name="saturday" checked />
                            ) : (
                              <CheckboxField name="saturday" />
                            )}
                            Sat
                          </Label>
                          <Label
                            onClick={() =>
                              (defaultSchedule.sunday = !defaultSchedule.sunday)
                            }
                            className={
                              'btn btn-default ' +
                              (defaultSchedule.sunday ? 'active' : '')
                            }
                          >
                            {defaultSchedule.sunday ? (
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
                      <div className="col-md-offset-2">
                        <em>
                          Define company wide weekly schedule. Press
                          correspondent button to toggle working/non-working
                          day.
                        </em>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-md-offset-2 col-md-11">
                        <Submit
                          type="submit"
                          className="btn btn-success pull-right single-click"
                        >
                          Save schedule
                        </Submit>
                      </div>
                    </div>
                  </Form>

                  <hr></hr>

                  <Form className="form-horizontal">
                    <div className="form-group">
                      <Label
                        name="carryOver"
                        className="col-md-9 control-label"
                      >
                        Calculate and carry over unused allowance
                      </Label>
                    </div>
                    <div className="form-group">
                      <div className="col-md-offset-2">
                        <p>
                          <em>
                            This action will carry over unused allowance for
                            each employee from <strong>prev year</strong> to the
                            current year, <strong>current year</strong>.
                          </em>
                        </p>
                        <p>
                          <em>
                            Please note, employees allowance is going to be
                            updated.
                          </em>
                        </p>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-md-offset-2 col-md-11">
                        <button
                          className="btn btn-success pull-right single-click"
                          onClick={onCarryOver}
                        >
                          <i className="fa fa-share"></i> Carry over allowance
                        </button>
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <LeaveTypeInput
            onLeaveChange={onLeaveChange}
            leaveTypes={leaveTypes}
          />
        </div>

        <div className="col-md-5 setting-general-2nd-column">
          <div className="panel panel-default">
            <div className="panel-heading">Public Holidays</div>
            <div className="panel-body">
              <div className="row">
                <div className="col-md-12 tst-no-bank-holidays">
                  Public holidays could be found{' '}
                  <Link to={routes.bankHolidays()}>here</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="panel panel-danger">
            <div className="panel-heading">
              <i className="fa fa-bomb"></i> Danger zone
            </div>
            <div className="panel-body">
              <div className="col-md-12">
                <div className="form-horizontal">
                  <div className="form-group">
                    <label htmlFor="" className="control-label text-left">
                      Remove company account
                    </label>
                  </div>
                  <div className="form-group">
                    <div className="col-md-6">
                      <p>
                        <em>
                          Completely erase data associated with OSDs account.
                        </em>
                      </p>
                      <p>
                        <em> This is action cannot be reverted.</em>
                      </p>
                    </div>
                    <div className="col-md-6">
                      <button
                        className="btn btn-danger pull-right"
                        data-toggle="modal"
                        data-target="#remove_company_modal"
                        type="button"
                      >
                        <i className="fa fa-remove"></i> Delete company account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
