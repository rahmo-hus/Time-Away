const AllowanceBreakdown = ({allowanceDetails}) => {

  const getAccruedAdjustment = () =>{
    return 0;
  }

  const returnZeroIfValueIsNull = val =>{
    return val ? val : 0;
  }

  return (
    <div>
      <dl>
        <dt>Allowance breakdown</dt>
        <dd>
          <em>Nominal allowance </em>
          <span className="pull-right"
            data-placement="top"
            data-toggle="popover"
            data-trigger="focus hover"
          >{ allowanceDetails.nominalAllowance }</span>
        </dd>
        <dd>
          <em>Carried over from {new Date().getFullYear() -1 }</em>
          <span className="pull-right"
            data-content="Allowance carried over from previous year. Note: this amount is calculated on the very first day of the year."
            data-placement="top"
            data-toggle="popover"
            data-trigger="focus hover"
            id="allowanceCarriedOverPart"
          >{ returnZeroIfValueIsNull(allowanceDetails.carriedOverAllowance) }</span>
        </dd>
        <dd>
          <em>Individual adjustment</em>
          <span className="pull-right"
            data-content="Adjustment to allowance done by admin user."
            data-placement="top"
            data-toggle="popover"
            data-trigger="focus hover"
          >{ returnZeroIfValueIsNull(allowanceDetails.adjustment) }</span>
        </dd>
        <dd>
          <em>Used so far</em>
          <span className="pull-right"
            data-content="Number of days already taken from allowance."
            data-placement="top"
            data-toggle="popover"
            data-trigger="focus hover"
          >{ allowanceDetails.daysTaken }</span>
        </dd>
        {allowanceDetails.isAccruedAllowance &&
        <dd>
          <em>Locked so far</em>
          <span className="pull-right"
            data-content="Number of unavailable days in allowance due to accrual nature of vacation entitlement."
            data-placement="top"
            data-toggle="popover"
            data-trigger="focus hover"
          >{getAccruedAdjustment()}</span>
        </dd>
        }
      </dl>

    </div>
  )
}

export default AllowanceBreakdown
