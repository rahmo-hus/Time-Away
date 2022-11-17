const AllowanceBreakdown = ({ allowanceDetails }) => {

  const getAccruedAdjustment = () => {
    return 0;
  }

  const returnZeroIfValueIsNull = val => {
    return val ? val : 0;
  }

  return (
    <div>
      <dl>
        <dt>Allowance breakdown</dt>
        <dd>
          <em>Nominal allowance </em>
          <span className="pull-right"
          >{allowanceDetails.nominalAllowance}</span>
        </dd>
        <dd>
          <em>Carried over from {new Date().getFullYear() - 1}</em>
          <span className="pull-right"
            id="allowanceCarriedOverPart"
          >{returnZeroIfValueIsNull(allowanceDetails.carriedOverAllowance)}</span>
        </dd>
        <dd>
          <em>Individual adjustment</em>
          <span className="pull-right"
          >{returnZeroIfValueIsNull(allowanceDetails.adjustment)}</span>
        </dd>
        <dd>
          <em>Used so far</em>
          <span className="pull-right"
            data-trigger="focus hover"
          >{allowanceDetails.daysTaken}</span>
        </dd>

        {allowanceDetails.isAccruedAllowance ?
          <dd>
            <em>Locked so far</em>
            <span className="pull-right"
            >{getAccruedAdjustment()}</span>
          </dd>
          : <></>
        }
      </dl>

    </div>
  )
}

export default AllowanceBreakdown
