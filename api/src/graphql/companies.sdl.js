export const schema = gql`
  type Company {
    id: Int!
    countryId: Int!
    startOfNewYear: Int!
    shareAllAbsences: Boolean!
    isTeamViewHidden: Boolean!
    dateFormat: String!
    companyWideMessage: String!
    name: String!
    mode: Int!
    verified: Boolean!
    timezone: String!
    carryOver: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    country: Country
    schedule: Schedule
    holidays: [Holiday]
    departments: [Department]
    employees: [User]
    manager: User
  }

  type Query {
    companies: [Company!]! @requireAuth
    company(id: Int!): Company @requireAuth
  }

  input CreateCompanyInput {
    countryId: Int!
    name: String
    companyWideMessage: String!
    timezone: String!
  }

  input VerifyCompanyInput {
    verified: Boolean
  }

  input UpdateCompanyInput {
    countryId: Int
    startOfNewYear: Int
    name: String
    shareAllAbsences: Boolean
    isTeamViewHidden: Boolean
    companyWideMessage: String
    carryOver: Int
  }

  type Mutation {
    createCompany(input: CreateCompanyInput!): Company! @skipAuth
    updateCompany(id: Int!, input: UpdateCompanyInput!): Company! @requireAuth
    deleteCompany(id: Int!): Company! @requireAuth
    verifyCompany(id: Int!, input: VerifyCompanyInput!): Company! @requireAuth
  }
`
