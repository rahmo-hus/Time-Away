import {
  schedules,
  schedule,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from './schedules'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('schedules', () => {
  scenario('returns all schedules', async (scenario) => {
    const result = await schedules()

    expect(result.length).toEqual(Object.keys(scenario.schedule).length)
  })

  scenario('returns a single schedule', async (scenario) => {
    const result = await schedule({ id: scenario.schedule.one.id })

    expect(result).toEqual(scenario.schedule.one)
  })

  scenario('creates a schedule', async () => {
    const result = await createSchedule({
      input: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true,
      },
    })

    expect(result.monday).toEqual(true)
    expect(result.tuesday).toEqual(true)
    expect(result.wednesday).toEqual(true)
    expect(result.thursday).toEqual(true)
    expect(result.friday).toEqual(true)
    expect(result.saturday).toEqual(true)
    expect(result.sunday).toEqual(true)
  })

  scenario('updates a schedule', async (scenario) => {
    const original = await schedule({
      id: scenario.schedule.one.id,
    })
    const result = await updateSchedule({
      id: original.id,
      input: { monday: false },
    })

    expect(result.monday).toEqual(false)
  })

  scenario('deletes a schedule', async (scenario) => {
    const original = await deleteSchedule({
      id: scenario.schedule.one.id,
    })
    const result = await schedule({ id: original.id })

    expect(result).toEqual(null)
  })
})
