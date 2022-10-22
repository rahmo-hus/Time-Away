import { Link, routes } from '@redwoodjs/router'
import { toast, Toaster } from '@redwoodjs/web/toast'
import { MetaTags } from '@redwoodjs/web'

import {
  FieldError,
  Form,
  Label,
  TextField,
  FormError,
  Submit
} from '@redwoodjs/forms'

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

const LoginPage = () => {

  const formMethods = useForm();

  const onSubmit = (data) => {

  }

  return (
    <>
      <MetaTags title="Login" description="Login page" />
      <h1 style={{ textAlign: 'center' }}>Login</h1>

      {/* {{> show_flash_messages }} */}
      <Toaster />

      <div className="row" style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="col-md-9">
          <Form className="form-horizontal"
            config={{ mode: 'onBlur' }}
            onSubmit={onSubmit}
            formMethods={formMethods}
          >
            {/* <FormError error={error} wrapperClassName="error text-center" /> */}
            <div className="row" style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="lead">Sign in into your account</div>
            </div>
            <hr></hr>
            <div className="form-group">
              <Label name="Email" className="col-md-4 control-label">
                Email
              </Label>
              <div className="col-md-6">
                <TextField
                  name="Email"
                  placeholder="user@company.com"
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
            <hr></hr>
            <div className="form-group">
              <div className="col-md-offset-4 col-md-1">
                <Submit className='btn btn-success'>Login</Submit>
              </div>
              <div className="col-md-5">
                <p className="pull-right"><a href="/forgot-password/">Forgot password?</a> | <a href="/register/">Register new company</a> </p>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  )
}

export default LoginPage
