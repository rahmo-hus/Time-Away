export const schema = gql`
  type LeaveType {
    id: Int!
    name: String!
    color: String
    useAllowance: Boolean
    limit: Int
    sortOrder: Int
    autoApprove: Boolean
    createdAt: DateTime!
    updatedAt: DateTime
    companyId: Int!
    company: Company!
  }

  type Query {
    leaveTypes: [LeaveType!]! @requireAuth
    leaveType(id: Int!): LeaveType @requireAuth
  }

  input CreateLeaveTypeInput {
    name: String!
    color: String
    useAllowance: Boolean
    limit: Int
    sortOrder: Int
    autoApprove: Boolean
    companyId: Int!
  }

  input UpdateLeaveTypeInput {
    name: String
    color: String
    useAllowance: Boolean
    limit: Int
    sortOrder: Int
    autoApprove: Boolean
    companyId: Int
  }

  type Mutation {
    createLeaveType(input: CreateLeaveTypeInput!): LeaveType! @requireAuth
    updateLeaveType(id: Int!, input: UpdateLeaveTypeInput!): LeaveType! @requireAuth
    deleteLeaveType(id: Int!): LeaveType! @requireAuth
  }
`
