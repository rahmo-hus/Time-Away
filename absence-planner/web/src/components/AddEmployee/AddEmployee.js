import { toast, Toaster } from '@redwoodjs/web/toast'
import {routes, Link} from '@redwoodjs/router'
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
import { useState, useEffect } from 'react';
import {useAuth} from "@redwoodjs/auth";

const AddEmployee = ({ data }) => {

  const formMethods = useForm();
  const [passwordValue, setPassword] = useState('');
  const {signUp} = useAuth();

  const [employeeData, setEmployeeData] = useState({});

  useEffect(() => {

  })

  const onSubmit = async (input) => {

    setEmployeeData({
      username: input.Email,
      firstName: input["First name"],
      lastName: input["Last name"],
      password: input.Password,
      isActivated: true,
      isAdmin: input.admin,
      startDate: input["Start date"],
      roles: input.admin ? 'manager' : 'employee',
      isAutoApprove: input.auto_approve,
      departmentId: parseInt(input.Department),
      companyId: data.company.id
    });

    const response = await signUp(employeeData);

    console.log(response)

    if(response.message){
      toast.success('User created successfully');
    }
    else if(response.error){
      toast.error(response.error);
    }
  }

  const dateFormatted = (date) => {
    return date.toISOString().split("T")[0];
  }

  return (
    <div>
      <h1 className="text-center">New employee</h1>

      <div className="row">
        <div className="lead text-center">Adding new employee account</div>

      </div>

      {/* {{> show_flash_messages }} */}

      <div className="row">
        <div className="col-md-6">
          <ol className="breadcrumb">
            <li><Link to={routes.viewEmployees()}>All Employees</Link></li>
            <li className="active">Add new employee</li>
          </ol>
        </div>
      </div>

      <div className="row main-row_header">
        <p className="col-md-12 text-center">Details of new employee</p>
      </div>
      <Toaster/>

      <div className="row">
        <div className="col-md-12">

          <Form className="form-horizontal"
            config={{ mode: 'onBlur' }}
            onSubmit={onSubmit}
            formMethods={formMethods}
          >

            <div className="form-group">
              <Label name="First name" className="col-md-3 control-label">
                First name
              </Label>
              <div className="col-md-3">
                <TextField
                  placeholder="First name of employee"
                  name="First name"
                  validation={{
                    required: true,
                  }}
                  errorClassName="form-control error"
                  className="form-control"
                />
                <FieldError name="Last name" className="error" />
              </div>
            </div>

            <div className="form-group">
              <Label name="Last name" className="col-md-3 control-label">
                Last name
              </Label>
              <div className="col-md-3">
                <TextField
                  name="Last name"
                  placeholder="Last name of employee"
                  validation={{
                    required: true,
                  }}
                  errorClassName="form-control error"
                  className="form-control"
                />
                <FieldError name="Last name" className="error" />
              </div>
            </div>

            <div className="form-group">
              <Label name="Email" className="col-md-3 control-label">Email Address</Label>
              <div className="col-md-3">
                <TextField
                  name="Email"
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
              <span id="email_help" className="help-block col-md-6">Email address used by employee</span>
            </div>

            <div className="form-group">
              <Label name="Department" className="col-md-3 control-label">Department</Label>
              <div className="col-md-3">
                <SelectField
                  name="Department"
                  validation={{
                    required: true
                  }}
                  errorClassName="form-control error"
                  className="form-control"
                >
                  {
                    data.company.departments.map((dept) => (
                      <React.Fragment key={dept.id}>
                        <option value={dept.id}>{dept.name}</option>
                      </React.Fragment>
                    ))
                  }
                </SelectField>
              </div>
              <span className="help-block col-md-6">Department employee belongs to</span>
            </div>

            <div className="form-group">
              <div className="col-md-3 col-md-offset-3">
                <Label name="admin" className="_col-md-2 control-label">
                  <CheckboxField name="admin" />
                  Is administrator user
                </Label>
              </div>
            </div>

            <div className="form-group">
              <div className="col-md-3 col-md-offset-3">
                <Label name="auto_approve" className="control-label">
                  <CheckboxField name="auto_approve" />
                  Auto approve leave requests
                </Label>
              </div>
              <span className="help-block">Set the flag ON to streamline leave requests from this employee directly into <strong>Approved</strong> state.</span>
            </div>

            <div className="form-group">
              <Label name="Start date" className="col-md-3 control-label">Started on</Label>
              <div className="col-md-3 date">
                <DateField name="Start date"
                  required
                  errorClassName="form-control error"
                  className="form-control book-leave-from-input"
                  defaultValue={dateFormatted(new Date())}
                />
              </div>
              <span id="start_date_help" className="help-block col-md-6">Date when employee started (inclusive)</span>
            </div>

            <div className="form-group">
              <Label name="Password" className="col-md-3 control-label">Password</Label>
              <div className="col-md-3 date">
                <TextField
                  name="Password"
                  onChange={e => setPassword(e.target.value)}
                  placeholder="***********"
                  type="password"
                  validation={{
                    required: true,
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
              <Label name="Password confirm" className="col-md-3 control-label">Confirm password</Label>
              <div className="col-md-3">
                <TextField
                  name="Password confirm"
                  placeholder="***********"
                  type="password"
                  validation={{
                    required: true,
                    validate: value => value === passwordValue || 'Passwords must match'
                  }}
                  errorClassName="form-control error"
                  className="form-control"
                />
                <FieldError name="Password confirm" className="error" />
              </div>
            </div>

            <div className="form-group">
              <div className="col-md-offset-3 col-md-3">
                <Submit className="btn btn-success pull-right single-click">Add new employee</Submit>
              </div>
            </div>
          </Form>

        </div>
      </div>
    </div>
  )
}

export default AddEmployee
