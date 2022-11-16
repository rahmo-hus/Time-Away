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

const EditDepartment = ({ department, onUpdate, error,onDelete, deleteLoading, loading }) => {

  const { employees } = department?.company;
  const {user} = department?.departmentSupervisor;

  const formMethods = useForm();

  const getAllowanceOptions = () => {
    const allowanceOptions = [];
    for (let i = 1; i <= 50; i++) { allowanceOptions.push(i) }
    return allowanceOptions;
  }

  return (
    <div>
      <h1>Department details</h1>

      <div className="row">
        <div className="col-md-3 lead">Edit department</div>
        <div className="col-md-3 col-md-offset-6">
          <div className="btn-group pull-right">
            <button disabled={deleteLoading} onClick={() => { if(window.confirm('Are you sure you want to delete this department?')) {onDelete()}}} className="pull-right btn btn-danger single-click"
            >
              <i className="fa fa-trash"></i> Delete
            </button>
          </div>
        </div>
      </div>

      <div className="col-md-3 list-group all-departments">
        <button className="list-group-item selected-item">General details</button>
      </div>

      <Form onSubmit={onUpdate}
        config={{ mode: 'onBlur' }}
        formMethods={formMethods}>
        <div className="col-md-7">

          <ol className="breadcrumb">
            <li><Link to={routes.departments()}>All departments</Link></li>
            <li className="active">{department.name}</li>
          </ol>

          <div className="form-group">
            <Label name="Department name" className="control-label">Name</Label>
            <TextField className="form-control"
              name="Department name"
              validation={{
                required: true,
                message: "Department name is required"
              }}
              defaultValue={department.name}
              errorClassName="form-control error" />
            <FieldError name="Department name" className="error" />
          </div>


          <div className="form-group">
            <Label className="control-label">Manager</Label>
            <SelectField defaultValue={user.id} className="form-control" name="manager">
              {
                employees.map((employee) => (
                  <React.Fragment key={employee.id}>
                    <option value={employee.id}>{employee.firstName} {employee.lastName}</option>
                  </React.Fragment>
                ))
              }
            </SelectField>
            <span className="help-block">Head of {department.name} department. </span>
          </div>


          <div className="form-group">
            <Label name="allowanceSelect">Allowance</Label>

            <SelectField defaultValue={department.allowance} className="form-control" name="allowance" >
              {
                getAllowanceOptions().map((option) => (
                  <option key={option}>{option}</option>
                ))
              }
            </SelectField>
          </div>

          <div className="form-group">
            <Label name="includePublicHolidays" className="control-label">
              Use bank holidays&nbsp;
            </Label>
            <CheckboxField defaultChecked={department.includePublicHolidays} name="includePublicHolidays" />
            <span className="help-block">Determine if employees from {department.name} have <a href="/settings/general" />bank holidays in addition to their allowance</span>
          </div>

          <div className="form-group">
            <Label name="isAccrued" className="control-label">
              Is accrued allowance &nbsp;
            </Label>
            <CheckboxField name="isAccrued" />
            <span className="help-block">If enabled, holiday allowance starts to build up - or accrue - from the first day of employment. It accrues in proportion to the annual entitlement. E.g. an employee in the ninth month of employment would have built up 9/12ths (or three-quarters) of annual entitlement.</span>
          </div>
        </div>

        <div className="row">
          <div className="col-md-10">
            <Submit disabled={loading} className="btn btn-success pull-right single-click">Save changes to department</Submit>
            <a className="btn btn-link pull-right" href="/settings/departments/">Cancel</a>
          </div>
        </div>
      </Form>
    </div>
  )
}

export default EditDepartment
