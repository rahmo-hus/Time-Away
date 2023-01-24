import {
  holidays,
  holiday,
  createHoliday,
  updateHoliday,
  deleteHoliday,
} from './holidays'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('holidays', () => {
  scenario('returns all holidays', async (scenario) => {
    const result = await holidays()

    expect(result.length).toEqual(Object.keys(scenario.holiday).length)
  })

  scenario('returns a single holiday', async (scenario) => {
    const result = await holiday({ id: scenario.holiday.one.id })

    expect(result).toEqual(scenario.holiday.one)
  })

  scenario('creates a holiday', async (scenario) => {
    const result = await createHoliday({
      input: {
        name: 'String',
        date: '2023-01-09T15:51:44.290Z',
        companyId: scenario.holiday.two.companyId,
      },
    })

    expect(result.name).toEqual('String')
    expect(result.date).toEqual(new Date('2023-01-09T15:51:44.290Z'))
    expect(result.companyId).toEqual(scenario.holiday.two.companyId)
  })

  scenario('updates a holiday', async (scenario) => {
    const original = await holiday({ id: scenario.holiday.one.id })
    const result = await updateHoliday({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a holiday', async (scenario) => {
    const original = await deleteHoliday({
      id: scenario.holiday.one.id,
    })
    const result = await holiday({ id: original.id })

    expect(result).toEqual(null)
  })
})
