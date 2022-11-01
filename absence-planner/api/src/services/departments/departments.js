import { db } from 'src/lib/db'

export const departments = () => {
  return db.department.findMany()
}

export const department = ({ id }) => {
  return db.department.findUnique({
    where: { id },
  })
}

export const departmentsByCompanyId = ({companyId}) =>{
  return db.department.findMany({
    where:{
      companyId: companyId
    }
  });
}

export const createDepartment = ({ input }) => {
  return db.department.create({
    data: input,
  })
}

export const updateDepartment = ({ id, input }) => {
  return db.department.update({
    data: input,
    where: { id },
  })
}

export const deleteDepartment = ({ id }) => {
  return db.department.delete({
    where: { id },
  })
}

export const Department = {
  company: (_obj, { root }) => {
    return db.department.findUnique({ where: { id: root?.id } }).company()
  },
  User: (_obj, { root }) => {
    return db.department.findUnique({ where: { id: root?.id } }).User()
  },
}
