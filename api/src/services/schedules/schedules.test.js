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

  scenario('creates a schedule', async (scenario) => {
    const result = await createSchedule({
      input: {
        companyId: scenario.schedule.two.companyId,
        userId: scenario.schedule.two.userId,
      },
    })

    expect(result.companyId).toEqual(scenario.schedule.two.companyId)
    expect(result.userId).toEqual(scenario.schedule.two.userId)
  })

  scenario('updates a schedule', async (scenario) => {
    const original = await schedule({
      id: scenario.schedule.one.id,
    })
    const result = await updateSchedule({
      id: original.id,
      input: { companyId: scenario.schedule.two.companyId },
    })

    expect(result.companyId).toEqual(scenario.schedule.two.companyId)
  })

  scenario('deletes a schedule', async (scenario) => {
    const original = await deleteSchedule({
      id: scenario.schedule.one.id,
    })
    const result = await schedule({ id: original.id })

    expect(result).toEqual(null)
  })
})
