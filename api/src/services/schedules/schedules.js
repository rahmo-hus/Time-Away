import { db } from 'src/lib/db'

export const schedules = () => {
  return db.schedule.findMany()
}

export const schedule = ({ id }) => {
  return db.schedule.findUnique({
    where: { id },
  })
}

export const createSchedule = ({ input }) => {
  return db.schedule.create({
    data: input,
  })
}

export const updateSchedule = ({ id, input }) => {
  return db.schedule.update({
    data: input,
    where: { id },
  })
}

export const deleteSchedule = ({ id }) => {
  return db.schedule.delete({
    where: { id },
  })
}

export const Schedule = {
  company: (_obj, { root }) => {
    return db.schedule.findUnique({ where: { id: root?.id } }).company()
  },
  user: (_obj, { root }) => {
    return db.schedule.findUnique({ where: { id: root?.id } }).user()
  },
}
