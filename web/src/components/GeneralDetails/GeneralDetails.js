import { toast, Toaster } from '@redwoodjs/web/toast'
import { routes, Link } from '@redwoodjs/router'
import {
  FieldError,
  Form,
  Label,
  TextField,
  FormError,
  DateField,
  SelectField,
  Submit,
  CheckboxField
} from '@redwoodjs/forms'

import { useForm } from 'react-hook-form';
import { useState } from 'react';

const GeneralDetails = ({ user, onSubmit, loading, error }) => {

  const formMethods = useForm();
  const [passwordValue, setPassword] = useState('');

  const dateFormatted = (date) => {
    return new Date(date).toISOString().split("T")[0];
  }

  return (
    <div className="col-md-7">
      <Form className="form-horizontal"
        config={{ mode: 'onBlur' }}
        onSubmit={onSubmit}
        formMethods={formMethods}
      >

        <div className="form-group">
          <Label name="First name" className="control-label">
            First name
          </Label>
          <TextField
            placeholder="First name of employee"
            name="First name"
            defaultValue={user?.firstName}
            validation={{
              required: true,
            }}
            errorClassName="form-control error"
            className="form-control"
          />
          <FieldError name="Last name" className="error" />
        </div>

        <div className="form-group">
          <Label name="Last name" className="control-label">
            Last name
          </Label>
          <TextField
            name="Last name"
            defaultValue={user?.lastName}
            placeholder="Last name of employee"
            validation={{
              required: true,
            }}
            errorClassName="form-control error"
            className="form-control"
          />
          <FieldError name="Last name" className="error" />
        </div>

        <div className="form-group">
          <Label name="Email" className="control-label">Email Address</Label>
          <TextField
            name="Email"
            defaultValue={user?.email}
            placeholder="Employee email"
            validation={{
              required: true,
              pattern: {
                value: /^[^@]+@[^.]+\..+$/,
                message: 'Please enter a valid email address',
              },
            }}
            errorClassName="form-control error"
            className="form-control"
          />
          <FieldError name="Email" className="error" />
        </div>

        <div className="form-group">
          <Label name="Department" className="control-label">Department</Label>
          <SelectField
            name="Department"
            defaultValue={user?.departmentId}
            validation={{
              required: true
            }}
            errorClassName="form-control error"
            className="form-control"
          >
            {
              user.company.departments.map((dept) => (
                <React.Fragment key={dept.id}>
                  <option value={dept.id}>{dept.name}</option>
                </React.Fragment>
              ))
            }
          </SelectField>
        </div>

        <div className="form-group">
          <Label name="admin">
            <CheckboxField name="admin"
              defaultChecked={user?.isAdmin}
            />
            Is administrator user
          </Label>
        </div>

        <div className="form-group">
          <Label name="auto_approve" className="control-label">
            <CheckboxField name="auto_approve"
              defaultChecked={user?.isAutoApprove}
            />
            Auto approve leave requests
          </Label>
        </div>

        <div className="form-group">
          <Label name="Start date" className="control-label">Started on</Label>
          <div className="date">
            <DateField name="Start date"
              required
              defaultValue={dateFormatted(user?.startDate)}
              errorClassName="form-control error"
              className="form-control book-leave-from-input"
            />
          </div>
        </div>

        <div className="form-group">
          <Label name="Password" className="control-label">Password</Label>
          <div className="date">
            <TextField
              name="Password"
              onChange={e => setPassword(e.target.value)}
              placeholder="***********"
              type="password"
              validation={{
                required: false,
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long"
                }
              }}
              errorClassName="form-control error"
              className="form-control"
            />
            <FieldError name="Password" className="error" />
          </div>
        </div>

        <div className="form-group">
          <Label name="Password confirm" className="control-label">Confirm password</Label>
          <TextField
            name="Password confirm"
            placeholder="***********"
            type="password"
            validation={{
              required: false,
              validate: value => value === passwordValue || 'Passwords must match'
            }}
            errorClassName="form-control error"
            className="form-control"
          />
          <FieldError name="Password confirm" className="error" />
        </div>

        <div className="form-group">
          <div className="col-md-12">
            <Submit className="btn btn-success pull-right single-click">Save changes</Submit>
            <Link className="btn btn-link pull-right" to={routes.viewEmployees()}>Cancel</Link>
          </div>
        </div>
      </Form>
    </div>
  )
}

export default GeneralDetails