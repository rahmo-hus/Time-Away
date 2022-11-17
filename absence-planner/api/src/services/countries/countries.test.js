import { countries } from './countries'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('countries', () => {
  scenario('returns all countries', async (scenario) => {
    const result = await countries()

    expect(result.length).toEqual(Object.keys(scenario.country).length)
  })
})
