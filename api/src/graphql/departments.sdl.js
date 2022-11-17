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
    users: [User]!
    departmentSupervisor: DepartmentSupervisor
    numberOfEmployees: Int
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
    createDepartment(input: CreateDepartmentInput!): Department! @skipAuth
    updateDepartment(id: Int!, input: UpdateDepartmentInput!): Department!
      @requireAuth
    createDepartmentSupervisor(input: CreateDepartmentSupervisorInput!): DepartmentSupervisor! @skipAuth
    deleteDepartment(id: Int!): Department! @requireAuth
  }
`
