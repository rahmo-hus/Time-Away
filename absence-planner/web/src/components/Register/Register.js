import { Link, routes, navigate } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import {
  FieldError,
  Form,
  Label,
  TextField,
  TextAreaField,
  FormError,
  Submit,
  SelectField,
} from '@redwoodjs/forms'
import {useForm} from '@redwoodjs/forms'
import { useState } from 'react'

const Register = ({onSubmit, loading}) => {


  const [passwordValue, setPassword] = useState('');
  const formMethods = useForm();

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>New company</h1>

      {/* {{> show_flash_messages }} */}
      <div className="row" style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="lead">Register new company account and supervisor user</div>
      </div>
      <hr></hr>

      <div className="row" style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="col-md-9">
          <Form className="form-horizontal"
            config={{ mode: 'onBlur' }}
            onSubmit={onSubmit}
            formMethods={formMethods}
          >

            <div className="form-group">
              <Label name="Company name" className="col-md-4 control-label">
                Company name
              </Label>
              <div className="col-md-6">
                <TextField
                  placeholder="Name of organization"
                  name="Company name"
                  validation={{
                    required: true,
                    message: 'Company name is required'
                  }}
                  errorClassName="form-control error"
                  className="form-control"
                />
                <FieldError name="Company name" className="error" />
              </div>
            </div>

            <div className="form-group">
              <Label name="Company message" className="col-md-4 control-label">
                Company info
              </Label>
              <div className="col-md-6">
                <TextAreaField
                  placeholder="Brief organization information"
                  name="Company info"
                  validation={{
                    required: true,
                    message: 'Company info is required'
                  }}
                  errorClassName="form-control error"
                  className="form-control"
                />
                <FieldError name="Company info" className="error" />
              </div>
            </div>

            <div className="form-group">
              <Label name="First name" className="col-md-4 control-label">
                First name
              </Label>
              <div className="col-md-6">
                <TextField
                  placeholder="First name of administrator user"
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
              <Label name="Last name" className="col-md-4 control-label">
                Last name
              </Label>
              <div className="col-md-6">
                <TextField
                  name="Last name"
                  placeholder="Last name of administrator user"
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
              <Label name="Department" className="col-md-4 control-label">
                Department
              </Label>
              <div className="col-md-6">
                <TextField
                  name="Department"
                  placeholder="Inital department name of user"
                  validation={{
                    required: true,
                  }}
                  errorClassName="form-control error"
                  className="form-control"
                />
                <FieldError name="Department" className="error" />
              </div>
            </div>

            <div className="form-group">
              <Label name="Email" className="col-md-4 control-label">
                Email
              </Label>
              <div className="col-md-6">
                <TextField
                  name="Email"
                  placeholder="Email of administrator user"
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
            </div>

            <div className="form-group">
              <Label name="Password" className="col-md-4 control-label">
                Password
              </Label>
              <div className="col-md-6">
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
              <Label name="Password confirm" className="col-md-4 control-label">
                Confirm password
              </Label>
              <div className="col-md-6">
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
              <Label name="country" className="col-md-4 control-label">
                Country
              </Label>
              <div className="col-md-6">
                <SelectField
                  name="country"
                  validation={{
                    required: true
                  }}
                  errorClassName="form-control error"
                  className="form-control"
                >
                  <option>Bosnia and Herzegovina</option>
                </SelectField>
                <FieldError name="country" className="error" />
              </div>
            </div>

            <div className="form-group">
              <Label name="timezone" className="col-md-4 control-label">
                Time zone
              </Label>
              <div className="col-md-6">
                <SelectField
                  name="timezone"
                  validation={{
                    required: true
                  }}
                  errorClassName="form-control error"
                  className="form-control"
                >
                  <option>CET</option>
                </SelectField>
                <FieldError name="timezone" className="error" />
              </div>
            </div>
            <hr></hr>
            <div className="form-group">
              <div className="col-md-offset-4 col-md-6">
                <Submit disabled={loading} className='btn btn-success'>Create</Submit>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Register
