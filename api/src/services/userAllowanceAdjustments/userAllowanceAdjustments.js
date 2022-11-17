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
    data: input
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

export const UserAllowanceAdjustment = {
  user: (_obj, { root }) => {
    return db.userAllowanceAdjustment
      .findUnique({ where: { id: root?.id } })
      .user()
  },
}
