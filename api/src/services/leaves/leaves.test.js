import { leaves, leave, createLeave, updateLeave, deleteLeave } from './leaves'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('leaves', () => {
  scenario('returns all leaves', async (scenario) => {
    const result = await leaves()

    expect(result.length).toEqual(Object.keys(scenario.leave).length)
  })

  scenario('returns a single leave', async (scenario) => {
    const result = await leave({ id: scenario.leave.one.id })

    expect(result).toEqual(scenario.leave.one)
  })

  scenario('creates a leave', async (scenario) => {
    const result = await createLeave({
      input: {
        approverId: scenario.leave.two.approverId,
        leaveTypeId: scenario.leave.two.leaveTypeId,
      },
    })

    expect(result.approverId).toEqual(scenario.leave.two.approverId)
    expect(result.leaveTypeId).toEqual(scenario.leave.two.leaveTypeId)
  })

  scenario('updates a leave', async (scenario) => {
    const original = await leave({ id: scenario.leave.one.id })
    const result = await updateLeave({
      id: original.id,
      input: { approverId: scenario.leave.two.approverId },
    })

    expect(result.approverId).toEqual(scenario.leave.two.approverId)
  })

  scenario('deletes a leave', async (scenario) => {
    const original = await deleteLeave({ id: scenario.leave.one.id })
    const result = await leave({ id: original.id })

    expect(result).toEqual(null)
  })
})
