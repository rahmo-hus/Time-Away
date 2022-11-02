export const schema = gql`
  type Department {
    id: Int!
    name: String
    allowance: Int
    includePublicHolidays: Boolean
    isAccruedAllowance: Boolean
    createdAt: DateTime!
    updatedAt: DateTime
    companyId: Int,
    company: Company
    User: [User]!
  }

  type Query {
    departments: [Department!]! @requireAuth
    department(id: Int!): Department @requireAuth
    departmentsByCompanyId(companyId: Int!) : [Department!]! @requireAuth
  }

  input CreateDepartmentInput {
    name: String
    allowance: Int
    includePublicHolidays: Boolean
    isAccruedAllowance: Boolean
    companyId: Int
  }

  input UpdateDepartmentInput {
    name: String
    allowance: Int
    includePublicHolidays: Boolean
    isAccruedAllowance: Boolean
    companyId: Int
  }

  type Mutation {
    createDepartment(input: CreateDepartmentInput!): Department! @requireAuth
    updateDepartment(id: Int!, input: UpdateDepartmentInput!): Department!
      @requireAuth
    deleteDepartment(id: Int!): Department! @requireAuth
  }
`
