import { RedwoodGraphQLError } from '@redwoodjs/graphql-server';
import { db } from 'src/lib/db'

function multipleDateRangeOverlaps(data, requestedDates) {
  var i, j;
  if (data.length > 0) {
    for (i = 0; i < data.length; i++) {
      if (data[i].dateStart <= requestedDates.dateEnd && requestedDates.dateStart <= data[i].dateEnd) {
        return true;
      }
    }
  }
  return false;
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
      requesterId: input.requesterId
    }
  });

  if(input.dateStart > input.dateEnd){
    throw new RedwoodGraphQLError("Error - date start has to be greater then date end");
  }

  if (multipleDateRangeOverlaps(leaves, { dateStart: input.dateStart, dateEnd: input.dateEnd })) {
    throw new RedwoodGraphQLError('Unable to add absence - overlapping dates exist');
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

export const leavesByUserId = ({userId}) =>{
  return db.leave.findMany({
    where: {
      requesterId: userId
    }
  });
}

export const deleteLeave = ({ id }) => {
  return db.leave.delete({
    where: { id },
  })
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
}
