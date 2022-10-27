import { db } from 'src/lib/db'

export const leaveTypes = () => {
  return db.leaveType.findMany()
}

export const leaveType = ({ id }) => {
  return db.leaveType.findUnique({
    where: { id },
  })
}

export const createLeaveType = ({ input }) => {
  return db.leaveType.create({
    data: input,
  })
}

export const updateLeaveType = ({ id, input }) => {
  return db.leaveType.update({
    data: input,
    where: { id },
  })
}

export const deleteLeaveType = ({ id }) => {
  return db.leaveType.delete({
    where: { id },
  })
}

export const LeaveType = {
  company: (_obj, { root }) => {
    return db.leaveType.findUnique({ where: { id: root?.id } }).company()
  },
  Leave: (_obj, { root }) => {
    return db.leaveType.findUnique({ where: { id: root?.id } }).Leave()
  },
}
