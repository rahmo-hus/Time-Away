import { useAuth } from '@redwoodjs/auth'

import AbsenceDetails from 'src/components/AbsenceDetails'
import UserRequests from 'src/components/UserRequests'

const Calendar = ({
  leavesByCurrentUser,
  department,
  allowanceAdjustment,
  leaveTypes,
}) => {
  const calculateDaysTaken = () => {
    return leavesByCurrentUser
      .filter((leave) => leave.status === 2)
      .reduce((acc, leave) => acc + leave.deductedDays, 0)
  }

  const calculateTotalDaysAvailable = () => {
    return (
      returnZeroIfValueIsNull(department?.allowance) +
      returnZeroIfValueIsNull(allowanceAdjustment?.adjustment) +
      returnZeroIfValueIsNull(allowanceAdjustment?.carriedOverAllowance)
    )
  }

  const returnZeroIfValueIsNull = (value) => {
    return value ? value : 0
  }

  const { currentUser } = useAuth()
  return (
    <>
      <h1 className="text-center">Employee calendar</h1>

      <div className="row flex-center">
        <div className="row">
          <div className="lead">
            {' '}
            {currentUser.firstName} {currentUser.lastName} calendar for{' '}
            {new Date().getFullYear()}
          </div>
          <div className="col-md-6"></div>
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
            <dt data-tom-days-available-in-allowance>
              {calculateTotalDaysAvailable() - calculateDaysTaken()}
            </dt>
            <dd>Days available</dd>
            <dd>
              out of{' '}
              <span data-tom-total-days-in-allowance>
                {calculateTotalDaysAvailable()}
              </span>{' '}
              in allowance
            </dd>
          </dl>
        </div>
        <AbsenceDetails
          allowanceAdjustment={allowanceAdjustment}
          leaveTypes={leaveTypes}
          department={department}
          leaves={leavesByCurrentUser}
        />
        <hr></hr>
        <UserRequests leaves={leavesByCurrentUser} />
      </div>
    </>
  )
}

export default Calendar
