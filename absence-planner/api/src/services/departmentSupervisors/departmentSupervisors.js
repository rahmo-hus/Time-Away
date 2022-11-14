import { db } from 'src/lib/db'

export const departmentSupervisors = () => {
  return db.departmentSupervisor.findMany()
}


export const DepartmentSupervisor = {
  user: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.userId } })
  },
  department: (_obj, { root }) => {
    return db.department
      .findUnique({ where: { id: root?.departmentId } })
  },
}
