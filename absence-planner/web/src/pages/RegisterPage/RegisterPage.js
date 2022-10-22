import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import {
  FieldError,
  Form,
  Label,
  TextField,
  TextAreaField,
  Submit,
  SelectField,
  Option
} from '@redwoodjs/forms'

const RegisterPage = () => {

  const onSubmit =(data)=>{
      console.log(data)
  }

  return (
    <>
      <MetaTags title="Register" description="Register page" />

      <h1 style={{textAlign:'center'}}>New company</h1>

      {/* {{> show_flash_messages }} */}

      <div className="row" style={{display:'flex', justifyContent:'center'}}>
        <div className="lead">Register new company account and supervisor user</div>
      </div>
      <hr></hr>

      <div className="row" style={{display:'flex', justifyContent:'center'}}>
        <div className="col-md-9">
          <Form className="form-horizontal" onSubmit={onSubmit}>

            <div className="form-group">
              <Label name="Company name" className="col-md-4 control-label">
                Company name
              </Label>
              <div className="col-md-6">
                <TextField
                id="company-name"
                  name="Company name"
                  validation={{
                    required: true,
                    message:'Company name is required'
                  }}
                  errorClassName="form-control error"
                  className="form-control"
                />
                <FieldError name="Company name" className="error" />
              </div>
            </div>

            <div className="form-group">
              <Label name="First name" className="col-md-4 control-label">
                First name
              </Label>
              <div className="col-md-6">
                <TextField
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
                  type="password"
                  validation={{
                    required: true
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
                  type="password"
                  validation={{
                    required: true
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
                <Submit className='btn btn-success'>Create</Submit>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  )
}

export default RegisterPage
