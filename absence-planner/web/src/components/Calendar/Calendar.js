import { useAuth } from "@redwoodjs/auth";
import { useEffect, useState } from 'react'
import AllowanceBreakdown from "src/components/AllowanceBreakdown";

const Calendar = ({ leaves, department, allowanceAdjustment, leaveTypes }) => {

  const { hasRole } = useAuth();
  const [showFullYear, setShowFullYear] = useState(false);

  useEffect(() => {
    console.log(leaveTypes);
  });

  const calculateDaysTaken = () => {
    let total = 0;
    for (let i = 0; i < leaves.length; i++) {
      const diffTime = Math.abs(new Date(leaves[i].dateEnd) - new Date(leaves[i].dateStart));
      total += parseInt(Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    }
    return total;
  }

  const calculateDaysTakenForLeaveTypeName = name => {
    let total = 0;
    for (let i = 0; i < leaves.length; i++) {
      if (leaves[i].leaveType.name === name) {
        const diffTime = Math.abs(new Date(leaves[i].dateEnd) - new Date(leaves[i].dateStart));
        total += parseInt(Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
      }
    }
    return total;
  }


  const { isAuthenticated, currentUser } = useAuth();
  return (
    <>
      <h1 className="text-center">Employee calendar</h1>

      <div className="row flex-center">
        <div className="row">
          <div className="lead"> {currentUser.firstName} {currentUser.lastName} calendar for  {new Date().getFullYear()}</div>
          <div className="col-md-6">
          </div>
        </div>
      </div>
      <hr></hr>

      <div className="row">&nbsp;</div>

      <div className="row main-row_header hidden-xs">
        <div className="col-md-12">Statistics</div>
      </div>

      <div className="row">

        <div className="col-md-2 top-leave-type-statistics">
          <dl>
            <dt data-tom-days-available-in-allowance>{department.allowance - calculateDaysTaken()}</dt>
            <dd>Days available</dd>
            <dd>out of <span data-tom-total-days-in-allowance>{department.allowance}</span> in allowance</dd>

          </dl>
        </div>
        <div className="flex-center">
          <div className="col-md-4 secondary-leave-type-statistics hidden-xs">
            <AllowanceBreakdown allowanceDetails={{ isAccruedAllowance: department.isAccruedAllowance, daysTaken: calculateDaysTaken(), nominalAllowance: department.allowance, ...allowanceAdjustment }} />
          </div>

          <div className="col-md-3 secondary-leave-type-statistics hidden-xs">
            <dl>
              <dt>Used so far</dt>
              {
                leaveTypes.map((leaveType) => (<>
                  <dd><em> {leaveType.name}</em> <span className="pull-right">{calculateDaysTakenForLeaveTypeName(leaveType.name)} out of {department.allowance}</span></dd>
                </>))
              }
              {
                !hasRole('manager') &&
                <dd className="text-muted">No approved requests so far.</dd>
              }
            </dl>
          </div>

          <div className="col-md-3 secondary-leave-type-statistics hidden-xs">
            <dl>
              <dt>Details</dt>
              <dd><em>Department:</em> <span className="pull-right"><a href="/calendar/teamview/?department={{ current_user.department.id }}">{department.name}</a></span></dd>
              <dd><em>Allowance in 2022:</em><span className="pull-right"> {department.allowance}</span></dd>
            </dl>
          </div>
        </div>
      </div>

      <div className="row">
      </div>


      <div className="row main-row_header">
        <div className="col-md-12">Calendar <a href="/calendar/feeds/" datatoggle="tooltip" dataplacement="right" title="Export absences  to external calendars"/></div>
      </div>

      <div className="row">
        <div className="flex-center">
          <div className="col-xs-2">
            { showFullYear &&
      <a className="btn btn-default" ><span aria-hidden="true" className="fa fa-chevron-left"></span> { new Date().getFullYear() - 1} </a>
      }
          </div>
          <div className="col-xs-8 calendar-section-caption">

            { showFullYear ? <strong>January - December {new Date().getFullYear()}</strong>: <strong>Upcoming Months</strong> }
            &nbsp;

            {/* {{# unless show_full_year }}
      <a className="btn btn-default" href="/calendar/?show_full_year=1">More... &nbsp;<span className="fa fa-plus"></span></a>
      {{ else}}
      <a className="btn btn-default" href="/calendar/">Less... &nbsp;<span className="fa fa-minus"></span></a>
      {{/ unless}} */}


          </div>
          <div className="col-xs-2">
            {/* {{ #if show_full_year }}
      <a className="btn btn-default pull-right" href="/calendar/?year={{next_year}}{{#if show_full_year}}&show_full_year=1{{/if}}">{{ next_year }} <span aria-hidden="true" className="fa fa-chevron-right"></span></a>
      {{/if}} */}
          </div>
        </div>

        <div className="row">&nbsp;</div>
        <div className="row clearfix">

          {/* {{# each calendar }} */}
          <div className="col-md-3 month_container">
            <table className="calendar_month month_{{ this.month }}">
              <thead>
                <tr>
                  <td colSpan="14">Date</td>
                </tr>
                <tr>
                  <td colSpan="2">M</td>
                  <td colSpan="2">T</td>
                  <td colSpan="2">W</td>
                  <td colSpan="2">T</td>
                  <td colSpan="2">F</td>
                  <td colSpan="2">S</td>
                  <td colSpan="2">S</td>
                </tr>
              </thead>
              <tbody>
                {/* {{ #each this.weeks }} */}
                <tr>
                  {/* {{ #each this }}
            {{> calendar_cell day = this}}
            {{/ each}} */}
                </tr>
                {/* {{/ each}} */}

              </tbody></table>
          </div>
          {/* {{/ each}} */}
        </div>
      </div>

      {/* {{# unless show_full_year }} */}

      <div className="row main-row_header">
        <p className="col-md-12">All my absences in 2022</p>
      </div>


    </>
  )
}

export default Calendar
