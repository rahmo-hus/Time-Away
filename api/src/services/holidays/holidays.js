import { db } from 'src/lib/db'

export const holidays = () => {
  return db.holiday.findMany()
}

export const holiday = ({ id }) => {
  return db.holiday.findUnique({
    where: { id },
  })
}

export const createHoliday = ({ input }) => {
  return db.holiday.create({
    data: input,
  })
}

export const updateHoliday = ({ id, input }) => {
  return db.holiday.update({
    data: input,
    where: { id },
  })
}

export const deleteHoliday = ({ id }) => {
  return db.holiday.delete({
    where: { id },
  })
}

export const Holiday = {
  company: (_obj, { root }) => {
    return db.holiday.findUnique({ where: { id: root?.id } }).company()
  },
}
