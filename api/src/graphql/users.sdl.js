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
    isTeamViewHidden: Boolean!
    company: Company
    department: Department
    approvedLeaves: [Leave]
    requestedLeaves: [Leave]
    allLeaves: [Leave]
    schedule: Schedule
    allowanceAdjustment: UserAllowanceAdjustment
    notifications: [Notification]
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
    email: String!
    password: String
    firstName: String!
    lastName: String!
    isActivated: Boolean
    roles: String!
    isAdmin: Boolean!
    isAutoApprove: Boolean!
    startDate: DateTime!
    isTeamViewHidden: Boolean!
    departmentId: Int!
  }

  input EmailUserInput {
    email: String!
    firstName: String!
    lastName: String!
    companyWideMessage: String
    name: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth
    emailUser(id: Int!, input: EmailUserInput): User! @skipAuth
  }
`
