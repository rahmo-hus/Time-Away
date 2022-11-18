import {
  CheckboxField,
  Form,
  Label,
  SelectField,
  Submit,
  TextField,
} from '@redwoodjs/forms'

const AddDepartment = ({ users, loading, addDepartment }) => {
  const getAllowanceOptions = () => {
    const options = []
    for (let i = 1; i <= 50; i++) {
      options.push(i)
    }
    return options
  }

  const onSubmit = (input) => {
    const companyId = users.find(
      (user) => user.id === parseInt(input['Department supervisor'])
    ).companyId
    //console.log({companyId, ...input})
    addDepartment({ companyId, ...input })
  }

  return (
    <div className="container flex-center">
      <Form onSubmit={onSubmit}>
        <h2>Add new Department</h2>
        <hr></hr>

        <div className="row">
          <div className="form-group">
            <Label name="name" className="control-label">
              Name:
            </Label>
            <TextField
              name="name"
              className="form-control"
              placeholder="New department name"
            />
          </div>

          <div className="form-group">
            <Label name="allowance" className="control-label">
              Allowance:
            </Label>
            <SelectField
              defaultValue={20}
              className="form-control"
              name="allowance"
            >
              {getAllowanceOptions().map((option) => (
                <option value={option} key={option}>
                  {option}
                </option>
              ))}
            </SelectField>
          </div>

          <div className="form-group">
            <CheckboxField name="includePublicHolidays" />
            &nbsp;
            <Label name="includePublicHolidays" className="control-label">
              Include Public Holidays?
            </Label>
          </div>

          <div className="form-group">
            <CheckboxField name="isAccruedAllowance" />
            &nbsp;
            <Label name="isAccruedAllowance" className="control-label">
              Accrued Allowance?
            </Label>
          </div>

          <div className="form-group">
            <Label name="Department supervisor" className="control-label">
              Supervisor
            </Label>
            <SelectField className="form-control" name="Department supervisor">
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.firstName} {user.lastName}
                </option>
              ))}
              {/* {{#each company.users}}
              <option value="{{this.id}}">{{this.full_name}}</option>
            {{/each}} */}
            </SelectField>
          </div>
        </div>
        <hr></hr>
        <Submit disabled={loading} className="btn btn-success pull-right">
          Create
        </Submit>
      </Form>
    </div>
  )
}

export default AddDepartment
