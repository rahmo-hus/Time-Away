import {
  leaveTypes,
  leaveType,
  createLeaveType,
  updateLeaveType,
  deleteLeaveType,
} from './leaveTypes'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('leaveTypes', () => {
  scenario('returns all leaveTypes', async (scenario) => {
    const result = await leaveTypes()

    expect(result.length).toEqual(Object.keys(scenario.leaveType).length)
  })

  scenario('returns a single leaveType', async (scenario) => {
    const result = await leaveType({ id: scenario.leaveType.one.id })

    expect(result).toEqual(scenario.leaveType.one)
  })

  scenario('creates a leaveType', async (scenario) => {
    const result = await createLeaveType({
      input: { name: 'String', companyId: scenario.leaveType.two.companyId },
    })

    expect(result.name).toEqual('String')
    expect(result.companyId).toEqual(scenario.leaveType.two.companyId)
  })

  scenario('updates a leaveType', async (scenario) => {
    const original = await leaveType({
      id: scenario.leaveType.one.id,
    })
    const result = await updateLeaveType({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a leaveType', async (scenario) => {
    const original = await deleteLeaveType({
      id: scenario.leaveType.one.id,
    })
    const result = await leaveType({ id: original.id })

    expect(result).toEqual(null)
  })
})
