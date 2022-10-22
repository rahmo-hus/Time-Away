export const schema = gql`
  type Company {
    id: Int!
    country: String!
    startOfNewYear: Int!
    shareAllAbsences: Boolean!
    isTeamViewHidden: Boolean!
    ldapAuthEnabled: Boolean!
    ldapAuthConfig: String!
    dateFormat: String!
    companyWideMessage: String!
    mode: Int!
    timezone: String!
    carryOver: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    companies: [Company!]! @requireAuth
    company(id: Int!): Company @requireAuth
  }

  input CreateCompanyInput {
    country: String!
    name: String
    username: String
    email: String
    password: String
    companyWideMessage: String!
    mode: Int!
    timezone: String!
  }

  input UpdateCompanyInput {
    country: String
    startOfNewYear: Int
    shareAllAbsences: Boolean
    isTeamViewHidden: Boolean
    ldapAuthEnabled: Boolean
    ldapAuthConfig: String
    dateFormat: String
    companyWideMessage: String
    mode: Int
    timezone: String
    carryOver: Int
  }

  type Mutation {
    createCompany(input: CreateCompanyInput!): Company! @skipAuth
    updateCompany(id: Int!, input: UpdateCompanyInput!): Company! @requireAuth
    deleteCompany(id: Int!): Company! @requireAuth
  }
`
