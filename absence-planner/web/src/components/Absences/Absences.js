import {
  FieldError,
  Form,
  Label,
  NumberField,
  TextField,
  FormError,
  DateField,
  SelectField,
  Submit,
  CheckboxField
} from '@redwoodjs/forms'
import { toast, Toaster } from '@redwoodjs/web/toast'
import AllowanceBreakdown from 'src/components/AllowanceBreakdown';

const Absences = ({
  user,
  allowanceAdjustment,
  leaves,
  leaveTypes,
  department,
  allowanceAdjustmentChangeLoading,
  allowanceAdjustmentChangeError,
  submitAllowanceAdjustment }) => {

  const calculateDaysTaken = () => {
    let total = 0;
    for (let i = 0; i < leaves.length; i++) {
      const diffTime = Math.abs(new Date(leaves[i].dateEnd) - new Date(leaves[i].dateStart));
      total += parseInt(Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    }
    return total;
  }

  const calculateTotalAllowance = () => {
    return department.allowance + allowanceAdjustment?.adjustment + allowanceAdjustment?.carriedOverAllowance;
  }

  const onSubmit = (input) => {
    submitAllowanceAdjustment({
      allowanceAdjustment: input.adjustment
    })
  }

  return (
    <div>
      <div className="col-md-9">
        <Form onSubmit={onSubmit}>
          {/* {{> user_details / breadcrumb employee=employee }} */}

          <div className="form-group">
            <Label className="control-label">Overview</Label>
            <div className="progress bigger">
              <div
                className="progress-bar progress-bar-success"
                style={{ width: calculateDaysTaken() * 100 / calculateTotalAllowance() + '%' }}
                data-content="Rahmo in current year used 10 days from allowance"
                data-placement="top"
                data-toggle="popover"
                data-trigger="focus hover"
              >
                {calculateDaysTaken()} days remaining
              </div>
              <div
                className="progress-bar progress-bar-warning"
                style={{ width: 100 - calculateDaysTaken() * 100 / calculateTotalAllowance() + '%' }}
                data-content="{{# with employee }}{{this.full_name }}{{/with}} in current year has {{ leave_statistics.remaining }} remaining days in allowance"
                data-placement="top"
                data-toggle="popover"
                data-trigger="focus hover"
              >
                {calculateTotalAllowance() - calculateDaysTaken()} days used so far
              </div>
            </div>
          </div>

          <div className="form-group">
            <Label className="control-label">Days available for {user.firstName} {user.lastName} to take this year</Label>
            <p>{calculateDaysTaken()} out of {calculateTotalAllowance()} in allowance</p>
          </div>

          <div className="row">
            <div className="col-md-5">
              <dl>
                <dt>Absences used this year grouped by leave types</dt>
                {
                  leaves ? leaveTypes.map((leaveType) => (
                    <React.Fragment key={leaveType.id}>
                      <dd><em>{leaveType.name}</em> <span className="pull-right">{leaves.reduce((acc, obj) => (acc + parseInt(Math.ceil((Math.abs(new Date(obj.dateEnd) - new Date(obj.dateStart))) / (1000 * 60 * 60 * 24)))), 0)}</span></dd>
                    </React.Fragment>
                  )) :
                    <dd className="text-muted">No approved requests so far.</dd>
                }
              </dl>
            </div>

            <div className="col-md-5 col-md-offset-2">
              <AllowanceBreakdown allowanceDetails={{ isAccruedAllowance: department.isAccruedAllowance, daysTaken: calculateDaysTaken(), nominalAllowance: department.allowance, ...allowanceAdjustment }} />
            </div>
          </div>

          <div className="form-group">
            <Label for="carried_over_allowance_inp" className="control-label">Allowance carried over from previous year</Label>
            <div className="input-group col-md-4">
              <NumberField className="form-control" step="1" disabled name="carriedOverAllowance" defaultValue={allowanceAdjustment?.carriedOverAllowance} />
              <span className="input-group-addon">working days</span>
            </div>
            <div id="carried_over_allowance_help" className="help-block">
              <div>Allowance adjustment based on unused holidays from previous year.</div>
              <div>It is calculated at the beginning of current year.</div>
            </div>
          </div>

          <div className="form-group">
            <Label for="adjustment_inp" className="control-label">Allowance adjustment in current year</Label>
            <div className="input-group col-md-4">
              <NumberField className="form-control" step={1} name="adjustment" defaultValue={allowanceAdjustment?.adjustment} />
              <span className="input-group-addon">working days</span>
            </div>
            <div className="help-block">
              <div>Tune allowance for this user in current year.</div>
              <div>Could be negative as well.</div>
              <div>The value is valid during current year. Next year it needs to be re-confirmed.</div>
            </div>
          </div>

          <div className="form-group">
            <div className="col-md-12">
              <Submit disabled={allowanceAdjustmentChangeLoading} className="btn btn-success pull-right single-click">Save changes</Submit>
            </div>
          </div>
        </Form>

        <div className="main-row_header">&nbsp;</div>
        {/*
        {{> user_requests_grouped grouped_leaves=grouped_leaves logged_user=logged_user }} */}

      </div>

    </div>
  )
}

export default Absences
