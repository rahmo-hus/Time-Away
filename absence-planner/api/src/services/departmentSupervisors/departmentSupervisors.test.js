import { departmentSupervisors } from './departmentSupervisors'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('departmentSupervisors', () => {
  scenario('returns all departmentSupervisors', async (scenario) => {
    const result = await departmentSupervisors()

    expect(result.length).toEqual(
      Object.keys(scenario.departmentSupervisor).length
    )
  })
})
