import { useAuth } from "@redwoodjs/auth";

import { useState, useEffect } from 'react';
import { toast, Toaster } from '@redwoodjs/web/toast';

import {
  FieldError,
  Form,
  Label,
  TextField,
  TextAreaField,
  FormError,
  Submit,
  DateField,
  SelectField,
} from '@redwoodjs/forms';

import { useMutation } from '@redwoodjs/web'

const CREATE_APPROVED_LEAVE = gql`
  mutation CreateApprovedLeaveMutation($leave: CreateLeaveInput!) {
    createLeave(input: $leave) {
      id
    }
  }
`

const NewAbsence = ({ users, leaveTypes }) => {

  const [request, setRequest] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submissionSuccess, setSubmissionSuccess]= useState(false);
  const { hasRole } = useAuth();

  const [create, {loading, error}] = useMutation(CREATE_APPROVED_LEAVE, {
    onCompleted: (data) => {
        toast.success("submission success");
        setSubmissionSuccess(true);
    }
  })

  const onSubmit = data => {
    setRequest({
      dateStart: data["Date from"],
      dateEnd: data["Date to"],
      approverId: parseInt(data.employee),
      requesterId:parseInt(data.employee),
      status: 2,
      approverComment: data.reason,
      dayPartStart: parseInt(data.from_date_part),
      dayPartEnd: parseInt(data.to_date_part),
      leaveTypeId: parseInt(data.leave_type)
    });
    setSubmitted(true);
  }

  const dateFormatted = (date) => {
    return date.toISOString().split("T")[0];
  }

  useEffect(() => {
    if(submitted){
    console.log(request)
    create({variables:{leave: request}});
    setSubmitted(false);
    }
  }, [request, submitted])

  return (
    <div className="container flex-center">
      <Form config={{ mode: 'onBlur' }} onSubmit={onSubmit}>
      <Toaster/>
      <FormError error={error} wrapperClassName="error" />
        <h1 style={{ textAlign: 'center' }}>New absence</h1>
        <hr></hr>
        <div className="modal-body">

          {/* {{# if_equal logged_user.supervised_users.length 1 }}{{else}} */}
          {hasRole('manager') &&
            <div className="form-group">
              <Label name="employee" className="control-label">For employee:</Label>
              <SelectField className="form-control" id="employee" name="employee">
                {
                  users.map((user) =>
                    <option key={user.id} value={user.id}>{user.firstName} {user.lastName}</option>
                  )
                }
                {/* {{#each logged_user.supervised_users}}
              <option value="{{@index}}" {{# if_equal this.id ../logged_user.id }}selected="selected"{{/if_equal}}>{{this.full_name}}</option>
              {{/each}} */}
              </SelectField>
            </div>
          }
          {/* {{/if_equal}} */}

          <div className="form-group">
            <Label name="leave_type" className="control-label">Leave type:</Label>
            <SelectField className="form-control" id="leave_type" name="leave_type">
              {
                leaveTypes.map(leaveType =>
                  <option key={leaveType.id} value={leaveType.id}>{leaveType.name}</option>
                )
              }
              {/* {{#each logged_user.company.leave_types }}
              <option value={{this.id}} data-tom="{{this.name}}" data-tom-index={{@index}}>{{this.name}}</option>
            {{/each}} */}
            </SelectField>
          </div>

          <div className="form-group">
            <Label className="control-label">From:</Label>
            <div className="row">
              <div className="col-md-5">
                <SelectField className="form-control" name="from_date_part">
                  <option value="1" defaultValue>All day</option>
                  <option value="2">Morning</option>
                  <option value="3">Afternoon</option>
                </SelectField>
              </div>
              <div className="col-md-7">
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-calendar"></i></span>
                  {/* <TextField type="text"
                    className="form-control book-leave-from-input"
                    id="from"
                    data-provide="datepicker"
                    data-date-autoclose="1"
                    data-date-format="YYYY-MM-DD"
                    data-date-week-start="1"
                    value="2022-05-05"
                    name="from_date" /> */}
                  <DateField name="Date from"
                    required
                    errorClassName="form-control error"
                    className="form-control book-leave-from-input"
                    defaultValue={dateFormatted(new Date())}
                  />
                  <FieldError name="Date from" className="error" />
                </div>
              </div>
            </div>
          </div>

          <div className="form-group">
            <Label htmlFor="to" className="control-label">To:</Label>
            <div className="row">
              <div className="col-md-5">
                <SelectField className="form-control" required name="to_date_part">
                  <option value="1" defaultValue>All day</option>
                  <option value="2">Morning</option>
                  <option value="3">Afternoon</option>
                </SelectField>
              </div>
              <div className="col-md-7">
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-calendar"></i></span>
                  <DateField name="Date to"
                    required
                    errorClassName="form-control error"
                    className="form-control book-leave-from-input"
                  />
                  <FieldError name="Date to" className="error" />
                </div>
              </div>
            </div>
          </div>

          <div className="form-group">
            <Label className="control-label">Comment (optional):</Label>
            <TextAreaField className="form-control" id="leave_reason" name="reason"></TextAreaField>
          </div>

        </div>
        <div className="modal-footer">
          <Submit disabled={loading || submissionSuccess} className="btn btn-success single-click">Create</Submit>
          {/* {{# if redirect_back_to }}
          <input type="hidden" name="redirect_back_to" value="{{redirect_back_to}}">
        {{else}}
          <input type="hidden" name="redirect_back_to" value="{{requested_path}}">
        {{/if}} */}
        </div>
      </Form>

    </div>
  )
}

export default NewAbsence
