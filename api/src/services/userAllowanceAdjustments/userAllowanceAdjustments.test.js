import {
  userAllowanceAdjustments,
  userAllowanceAdjustment,
  createUserAllowanceAdjustment,
  updateUserAllowanceAdjustment,
  deleteUserAllowanceAdjustment,
} from './userAllowanceAdjustments'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('userAllowanceAdjustments', () => {
  scenario('returns all userAllowanceAdjustments', async (scenario) => {
    const result = await userAllowanceAdjustments()

    expect(result.length).toEqual(
      Object.keys(scenario.userAllowanceAdjustment).length
    )
  })

  scenario('returns a single userAllowanceAdjustment', async (scenario) => {
    const result = await userAllowanceAdjustment({
      id: scenario.userAllowanceAdjustment.one.id,
    })

    expect(result).toEqual(scenario.userAllowanceAdjustment.one)
  })

  scenario('creates a userAllowanceAdjustment', async (scenario) => {
    const result = await createUserAllowanceAdjustment({
      input: { userId: scenario.userAllowanceAdjustment.two.userId },
    })

    expect(result.userId).toEqual(scenario.userAllowanceAdjustment.two.userId)
  })

  scenario('updates a userAllowanceAdjustment', async (scenario) => {
    const original = await userAllowanceAdjustment({
      id: scenario.userAllowanceAdjustment.one.id,
    })
    const result = await updateUserAllowanceAdjustment({
      id: original.id,
      input: { userId: scenario.userAllowanceAdjustment.two.userId },
    })

    expect(result.userId).toEqual(scenario.userAllowanceAdjustment.two.userId)
  })

  scenario('deletes a userAllowanceAdjustment', async (scenario) => {
    const original = await deleteUserAllowanceAdjustment({
      id: scenario.userAllowanceAdjustment.one.id,
    })
    const result = await userAllowanceAdjustment({ id: original.id })

    expect(result).toEqual(null)
  })
})
