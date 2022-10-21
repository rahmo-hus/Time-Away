import {
  companies,
  company,
  createCompany,
  updateCompany,
  deleteCompany,
} from './companies'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('companies', () => {
  scenario('returns all companies', async (scenario) => {
    const result = await companies()

    expect(result.length).toEqual(Object.keys(scenario.company).length)
  })

  scenario('returns a single company', async (scenario) => {
    const result = await company({ id: scenario.company.one.id })

    expect(result).toEqual(scenario.company.one)
  })

  scenario('creates a company', async () => {
    const result = await createCompany({
      input: {
        country: 'String',
        startOfNewYear: 576697,
        ldapAuthEnabled: true,
        ldapAuthConfig: 'String',
        dateFormat: 'String',
        companyWideMessage: 'String',
        mode: 4872274,
        timezone: 'String',
        carryOver: 1361217,
        updatedAt: '2022-10-21T18:42:02.804Z',
      },
    })

    expect(result.country).toEqual('String')
    expect(result.startOfNewYear).toEqual(576697)
    expect(result.ldapAuthEnabled).toEqual(true)
    expect(result.ldapAuthConfig).toEqual('String')
    expect(result.dateFormat).toEqual('String')
    expect(result.companyWideMessage).toEqual('String')
    expect(result.mode).toEqual(4872274)
    expect(result.timezone).toEqual('String')
    expect(result.carryOver).toEqual(1361217)
    expect(result.updatedAt).toEqual(new Date('2022-10-21T18:42:02.804Z'))
  })

  scenario('updates a company', async (scenario) => {
    const original = await company({ id: scenario.company.one.id })
    const result = await updateCompany({
      id: original.id,
      input: { country: 'String2' },
    })

    expect(result.country).toEqual('String2')
  })

  scenario('deletes a company', async (scenario) => {
    const original = await deleteCompany({
      id: scenario.company.one.id,
    })
    const result = await company({ id: original.id })

    expect(result).toEqual(null)
  })
})
