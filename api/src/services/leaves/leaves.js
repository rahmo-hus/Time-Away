import { RedwoodGraphQLError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'

function multipleDateRangeOverlaps(data, requestedDates) {
  var i
  if (data.length > 0) {
    for (i = 0; i < data.length; i++) {
      if (
        data[i].dateStart <= requestedDates.dateEnd &&
        requestedDates.dateStart <= data[i].dateEnd
      ) {
        return true
      }
    }
  }
  return false
}

export const leaves = () => {
  return db.leave.findMany()
}

export const leave = ({ id }) => {
  return db.leave.findUnique({
    where: { id },
  })
}

export const createLeave = async ({ input }) => {
  const leaves = await db.leave.findMany({
    where: {
      requesterId: input.requesterId,
      NOT: {
        status: 3,
      },
    },
  })

  if (input.dateStart > input.dateEnd) {
    throw new RedwoodGraphQLError(
      'Error - date start has to be greater then date end'
    )
  }

  if (
    multipleDateRangeOverlaps(leaves, {
      dateStart: input.dateStart,
      dateEnd: input.dateEnd,
    })
  ) {
    throw new RedwoodGraphQLError(
      'Unable to add absence - overlapping dates exist'
    )
  }

  return db.leave.create({
    data: input,
  })
}

export const updateLeave = ({ id, input }) => {
  return db.leave.update({
    data: input,
    where: { id },
  })
}

export const leavesByUserId = ({ userId }) => {
  return db.leave.findMany({
    where: {
      requesterId: userId,
    },
  })
}

export const deleteLeave = ({ id }) => {
  return db.leave.delete({
    where: { id },
  })
}

export const approveLeave = ({ id, input }) => {
  return db.leave.update({
    where: { id },
    data: input,
  })
}

export const requestedLeaves = async ({ id }) => {
  const forApproval = await db.leave.findMany({
    where: {
      approverId: id,
      status: 1,
    },
  })

  const forRevoke = await db.leave.findMany({
    where: {
      approverId: id,
      status: 4,
    },
  })

  return forApproval.concat(forRevoke)
}

export const Leave = {
  requester: (_obj, { root }) => {
    return db.leave.findUnique({ where: { id: root?.id } }).requester()
  },
  approver: (_obj, { root }) => {
    return db.leave.findUnique({ where: { id: root?.id } }).approver()
  },
  leaveType: (_obj, { root }) => {
    return db.leave.findUnique({ where: { id: root?.id } }).leaveType()
  },
  deductedDays: (_obj, { root }) => {
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

    // TODO: check schedule
    return new Date(root?.dateEnd).workingDaysFrom(root?.dateStart)
  },
}
