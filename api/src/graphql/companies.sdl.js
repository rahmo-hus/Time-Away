export const schema = gql`
  type Company {
    id: Int!
    countryId: Int!
    startOfNewYear: Int!
    shareAllAbsences: Boolean!
    isTeamViewHidden: Boolean!
    ldapAuthEnabled: Boolean!
    ldapAuthConfig: String!
    dateFormat: String!
    companyWideMessage: String!
    name: String!
    mode: Int!
    timezone: String!
    carryOver: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    country: Country
    schedule: Schedule
    departments: [Department]
    employees: [User]
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
  }
`
