import { db } from 'src/lib/db'

export const userAllowanceAdjustments = () => {
  return db.userAllowanceAdjustment.findMany()
}

export const userAllowanceAdjustment = ({ id }) => {
  return db.userAllowanceAdjustment.findUnique({
    where: { id },
  })
}

export const createUserAllowanceAdjustment = ({ input }) => {
  return db.userAllowanceAdjustment.create({
    data: input,
  })
}

export const updateUserAllowanceAdjustment = ({ id, input }) => {
  return db.userAllowanceAdjustment.update({
    data: input,
    where: { id },
  })
}

export const deleteUserAllowanceAdjustment = ({ id }) => {
  return db.userAllowanceAdjustment.delete({
    where: { id },
  })
}

export const carryOverFromPreviousYear = async () => {
  Date.prototype.workingDaysFrom = function (fromDate) {
    // ensure that the argument is a valid and past date
    if (!fromDate || isNaN(fromDate) || this < fromDate) {
      return -1
    }

    // clone date to avoid messing up original date and time
    var frD = new Date(fromDate.getTime()),
      toD = new Date(this.getTime()),
      numOfWorkingDays = 1

    // reset time portion
    frD.setHours(0, 0, 0, 0)
    toD.setHours(0, 0, 0, 0)

    while (frD < toD) {
      frD.setDate(frD.getDate() + 1)
      var day = frD.getDay()
      if (day != 0 && day != 6) {
        numOfWorkingDays++
      }
    }
    return numOfWorkingDays
  }
  const users = await db.user.findMany()
  const adjustments = users.map(async (user) => {
    const allowanceAdjustment = await db.userAllowanceAdjustment.findUnique({
      where: { userId: user.id },
    })
    if (allowanceAdjustment) {
      if (allowanceAdjustment.year !== new Date().getFullYear()) {
        const approvedLeaves = await db.leave.findMany({
          where: { status: 2, requesterId: user.id },
        })
        const department = await db.department.findUnique({
          where: { id: user.departmentId },
        })
        let totalDeductedDays = 0
        if (approvedLeaves) {
          for (let i = 0; i < approvedLeaves.length; i++) {
            totalDeductedDays += new Date(
              approvedLeaves[i].dateEnd
            ).workingDaysFrom(approvedLeaves[i].dateStart)
          }
        }
        return db.userAllowanceAdjustment.update({
          where: {
            id: allowanceAdjustment.id,
          },
          data: {
            year: new Date().getFullYear(),
            carriedOverAllowance: department.allowance - totalDeductedDays,
          },
        })
      }
    } else {
      if (
        !user.startDate ||
        new Date(user.startDate).getFullYear() === new Date().getFullYear()
      ) {
        return db.userAllowanceAdjustment.create({
          data: {
            year: new Date().getFullYear(),
            adjustment: 0,
            carriedOverAllowance: 0,
            userId: user.id,
          },
        })
      } else {
        const approvedLeaves = user.approvedLeaves
        const department = await db.department.findUnique({
          where: { id: user.departmentId },
        })
        let totalDeductedDays = 0
        if (approvedLeaves) {
          for (let i = 0; i < approvedLeaves.length; i++) {
            totalDeductedDays += approvedLeaves[i].deductedDays
          }
        }
        return db.userAllowanceAdjustment.create({
          data: {
            year: new Date().getFullYear(),
            adjustment: 0,
            carriedOverAllowance: department.allowance - totalDeductedDays,
            userId: user.id,
          },
        })
      }
    }
  })

  return adjustments
}

export const UserAllowanceAdjustment = {
  user: (_obj, { root }) => {
    return db.userAllowanceAdjustment
      .findUnique({ where: { id: root?.id } })
      .user()
  },
}
