import { db } from 'src/lib/db'

export const users = () => {
  return db.user.findMany()
}

export const user = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const usersByCompanyId = ({ companyId }) => {
  return db.user.findMany({
    where: {
      companyId: companyId,
    },
  })
}

export const createUser = ({ input }) => {
  return db.user.create({
    data: input,
  })
}

export const updateUser = ({ id, input }) => {
  return db.user.update({
    data: input,
    where: { id },
  })
}

export const deleteUser = ({ id }) => {
  return db.user.delete({
    where: { id },
  })
}

export const User = {
  company: async (_obj, { root }) => {
    const company = await db.user
      .findUnique({ where: { id: root?.id } })
      .company()
    company.departments = await db.department.findMany({
      where: { companyId: company.id },
    })

    return company
  },
  approvedLeaves: (_obj, { root }) => {
    return db.leave.findMany({ where: { status: 2, requesterId: root?.id } })
  },
  requestedLeaves: (_obj, { root }) => {
    return db.leave.findMany({ where: { status: 1, requesterId: root?.id } })
  },
  allLeaves: (_obj, { root }) => {
    return db.leave.findMany({ where: { requesterId: root?.id } })
  },
  schedule: (_obj, { root }) => {
    return db.schedule.findUnique({ where: { userId: root?.id } })
  },
  department: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).department()
  },
  allowanceAdjustment: (_obj, { root }) => {
    return db.userAllowanceAdjustment.findUnique({
      where: { userId: root?.id },
    })
  },
}
