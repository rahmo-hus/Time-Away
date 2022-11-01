import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

export const companies = () => {

  return db.findMany();
}

export const company = ({ id }) => {
  return db.company.findUnique({
    where: { id },
  })
}

export const createCompany = ({ input }) => {
  return  db.company.create({
    data: input,
  });
}

export const updateCompany = ({ id, input }) => {
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
}
