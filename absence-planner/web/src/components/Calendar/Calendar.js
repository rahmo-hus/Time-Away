import { useAuth } from "@redwoodjs/auth";
import { useEffect, useState } from 'react'
import AbsenceDetails from "src/components/AbsenceDetails";

const Calendar = ({ leaves, department, allowanceAdjustment, leaveTypes }) => {

  const calculateDaysTaken = () => {
    let total = 0;
    for (let i = 0; i < leaves.length; i++) {
      const diffTime = Math.abs(new Date(leaves[i].dateEnd) - new Date(leaves[i].dateStart));
      total += parseInt(Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    }
    return total;
  }

  const returnZeroIfValueIsNull = value =>{
    return value ? value : 0;
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
            <dt data-tom-days-available-in-allowance>{returnZeroIfValueIsNull(department?.allowance) - calculateDaysTaken()}</dt>
            <dd>Days available</dd>
            <dd>out of <span data-tom-total-days-in-allowance>{returnZeroIfValueIsNull(department?.allowance) + returnZeroIfValueIsNull(allowanceAdjustment?.adjustment) + returnZeroIfValueIsNull(allowanceAdjustment?.carriedOverAllowance)}</span> in allowance</dd>
          </dl>
        </div>
        <AbsenceDetails
         allowanceAdjustment={allowanceAdjustment}
         leaveTypes={leaveTypes}
         department={department}
          leaves={leaves}
         />

      </div>
    </>
  )
}

export default Calendar
