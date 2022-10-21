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
    Department: Department
  }

  type Query {
    companies: [Company!]! @requireAuth
    company(id: Int!): Company @requireAuth
  }

  input CreateCompanyInput {
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
    createCompany(input: CreateCompanyInput!): Company! @requireAuth
    updateCompany(id: Int!, input: UpdateCompanyInput!): Company! @requireAuth
    deleteCompany(id: Int!): Company! @requireAuth
  }
`
