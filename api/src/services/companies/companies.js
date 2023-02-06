import { db } from 'src/lib/db'

export const companies = () => {
  return db.company.findMany()
}

export const company = ({ id }) => {
  return db.company.findUnique({
    where: { id },
  })
}

export const createCompany = ({ input }) => {
  return db.company.create({
    data: input,
  })
}

export const updateCompany = ({ id, input }) => {
  return db.company.update({
    data: input,
    where: { id },
  })
}

export const verifyCompany = async ({ id, input }) => {
  await db.user.updateMany({
    data: {
      isActivated: input.verified,
    },
    where: { companyId: id },
  })
  return db.company.update({
    data: input,
    where: { id },
  })
}

export const deleteCompany = ({ id }) => {
  return db.company.delete({
    where: { id },
  })
}

export const Company = {
  Department: (_obj, { root }) => {
    return db.company.findUnique({ where: { id: root?.id } }).Department()
  },
  schedule: (_obj, { root }) => {
    return db.schedule.findFirst({
      where: {
        companyId: root?.id,
        userId: null,
      },
    })
  },
  employees: (_obj, { root }) => {
    return db.user.findMany({
      where: {
        companyId: root?.id,
      },
    })
  },
  departments: (_obj, { root }) => {
    return db.department.findMany({ where: { companyId: root?.id } })
  },
  country: (_obj, { root }) => {
    return db.country.findUnique({
      where: {
        id: root?.countryId,
      },
    })
  },
  holidays: (_obj, { root }) => {
    return db.holiday.findMany({
      where: { id: root?.companyId },
    })
  },
  manager: async (_obj, { root }) => {
    const users = await db.user.findMany({
      where: {
        companyId: root?.id,
        isAdmin: true,
      },
    })
    if (users) {
      return users[0]
    }
    return null
  },
}
