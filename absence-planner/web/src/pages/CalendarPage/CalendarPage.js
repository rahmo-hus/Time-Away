import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const CalendarPage = () => {
  return (
    <>
      <MetaTags title="Calendar" description="Calendar page" />

      <h1>Employee calendar</h1>

      <div className="row">
        <div className="col-md-6 lead"> Name and lastname's calendar for  2022</div>
        <div className="col-md-6">
        </div>
      </div>



      <div className="row">&nbsp;</div>

      <div className="row main-row_header hidden-xs">
        <div className="col-md-12">Statistics</div>
      </div>

      <div className="row">

        {/* <div className="col-md-3 top-leave-type-statistics">
          <dl>
            {{ #with current_user }}
            <dt data-tom-days-available-in-allowance>{{ ../ user_allowance.number_of_days_available_in_allowance }}</dt>
            <dd>Days available</dd>
            <dd>out of <span data-tom-total-days-in-allowance>{{ ../ user_allowance.total_number_of_days_in_allowance }}</span> in allowance</dd>
            {{/with}}
          </dl>
        </div> */}

        <div className="col-md-3 secondary-leave-type-statistics hidden-xs">
          {/* {{> user_details / allowance_breakdown user_allowance = user_allowance }} */}
          User allowed allowance
        </div>

        <div className="col-md-3 secondary-leave-type-statistics hidden-xs">
          <dl>
            <dt>Used so far</dt>

            {/* {{# if leave_type_statistics }}
            {{# each leave_type_statistics }} */}
            <dd><em> Leave type name</em> <span className="pull-right">Days taken: Days limit out of limit</span></dd>
            {/* {{/ each}}
            {{ else}} */}

            <dd className="text-muted">No approved requests so far.</dd>
            {/* {{/if}} */}
          </dl>
        </div>

        <div className="col-md-3 secondary-leave-type-statistics hidden-xs">
          <dl>
            <dt>Details</dt>
            {/* {{~# each supervisors  ~}} */}
            {/* <dd>
              <em>{{# if  @first }} Supervisor: {{ else   }}  &nbsp;   {{/ if  }}</em>
              <span className="pull-right"><a href="mailto:{{this.email}}">{{ this.full_name }}</a></span>
            </dd> */}
            {/* {{~/ each ~}} */}
            <dd><em>Department:</em> <span className="pull-right"><a href="/calendar/teamview/?department={{ current_user.department.id }}">Current user department</a></span></dd>
            <dd><em>Allowance in 2022:</em><span className="pull-right"> Total number of in allowance days</span></dd>
            </dl>
            </div>

        </div>

        <div className="row">
        </div>


        <div className="row main-row_header">
          <div className="col-md-12">Calendar <a href="/calendar/feeds/" data-toggle="tooltip" data-placement="right" title="Export absences  to external calendars"><span className="fa fa-rss"></span></a></div>
        </div>

        <div className="row">
          <div className="col-xs-2">
            {/* {{ #if show_full_year }}
            <a className="btn btn-default" href="/calendar/?year={{previous_year}}{{#if show_full_year}}&show_full_year=1{{/if}}"><span aria-hidden="true" className="fa fa-chevron-left"></span> {{ previous_year }} </a>
            {{/if}} */}
          </div>
          <div className="col-xs-8 calendar-section-caption">

            {/* <strong>{{ #if show_full_year }}January - December {{ current_year }}{{ else}}Upcoming Months{{/if}}</strong> */}
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
                  <td colspan="14">Date</td>
                </tr>
                <tr>
                  <td colspan="2">M</td>
                  <td colspan="2">T</td>
                  <td colspan="2">W</td>
                  <td colspan="2">T</td>
                  <td colspan="2">F</td>
                  <td colspan="2">S</td>
                  <td colspan="2">S</td>
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

        {/* {{# unless show_full_year }} */}

        <div className="row main-row_header">
          <p className="col-md-12">All my absences in 2022</p>
        </div>


      </>
      )
}

      export default CalendarPage
