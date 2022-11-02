import { Link, routes, navigate } from '@redwoodjs/router'
import { toast, Toaster } from '@redwoodjs/web/toast'
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

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@redwoodjs/auth'



const CREATE_COMPANY = gql`
  mutation CreateCompanyMutation($company: CreateCompanyInput!) {
    createCompany(input: $company) {
      id
    }
  }
`

const RegisterPage = () => {
  const { isAuthenticated, signUp } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.calendar())
   }
  }, [])


  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [createCompany] = useMutation(CREATE_COMPANY, {
    onCompleted: async (data) => {
      setLoading(true);
      const response = await signUp({ ...userData, companyId: data.createCompany.id });
      if (response) {
        toast.success("Company created successfully");

      }
      else if (response.error) {
        toast.error(response.error);
        setLoading(false);
      }
    }
  });


  const [passwordValue, setPassword] = useState('');
  const formMethods = useForm();

  const onSubmit = (data) => {
    setUserData({
      username: data.Email,
      password: data.Password,
      firstName: data["First name"],
      lastName: data["Last name"],
      isActivated: true,
      isAdmin: true,
      isAutoApprove: true,
      roles: 'manager'
    });

    createCompany({
      variables: {
        company: {
          name: data["Company name"],
          country: data.country,
          timezone: data.timezone,
          companyWideMessage: data["Company info"]
        }
      }
    });
  }

  return (
    <>
      <MetaTags title="Register" description="Register page" />

      <h1 style={{ textAlign: 'center' }}>New company</h1>

      {/* {{> show_flash_messages }} */}
      <Toaster />
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
    </>
  )
}

export default RegisterPage
