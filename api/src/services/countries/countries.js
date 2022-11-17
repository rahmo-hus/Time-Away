import { db } from 'src/lib/db'

export const countries = () => {
  return db.country.findMany()
}
