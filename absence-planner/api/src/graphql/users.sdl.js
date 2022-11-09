export const schema = gql`
  type User {
    id: Int!
    email: String
    password: String
    firstName: String
    lastName: String
    isActivated: Boolean!
    isAdmin: Boolean!
    roles: String
    isAutoApprove: Boolean!
    startDate: DateTime
    updatedAt: DateTime
    companyId: Int
    departmentId: Int
    company: Company
    department: Department
    approvedLeaves: [Leave],
    schedule: Schedule
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: Int!): User @requireAuth
    usersByCompanyId(companyId: Int!): [User!]! @requireAuth
  }

  input CreateUserInput {
    email: String
    password: String
    firstName: String
    lastName: String
    isActivated: Boolean!
    isAdmin: Boolean!
    isAutoApprove: Boolean!
    companyId: Int
  }

  input UpdateUserInput {
    email: String
    password: String
    firstName: String
    lastName: String
    isActivated: Boolean
    roles: String
    isAdmin: Boolean
    isAutoApprove: Boolean
    startDate: DateTime
    departmentId: Int
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth
  }
`
