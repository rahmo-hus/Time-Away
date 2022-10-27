export const schema = gql`
  type Leave {
    id: Int!
    status: Int
    employeeComment: String
    approverComment: String
    decidedAt: DateTime
    dateStart: DateTime
    dateEnd: DateTime
    dayPartStart: Int
    dayPartEnd: Int
    createdAt: DateTime!
    updatedAt: DateTime
    requesterId: Int
    approverId: Int!
    leaveTypeId: Int!
    requester: User
    approver: User!
    leaveType: LeaveType!
  }

  type Query {
    leaves: [Leave!]! @requireAuth
    leave(id: Int!): Leave @requireAuth
    leavesByUserId(userId: Int!): [Leave!] @requireAuth
  }

  input CreateLeaveInput {
    status: Int
    employeeComment: String
    approverComment: String
    decidedAt: DateTime
    dateStart: DateTime
    dateEnd: DateTime
    dayPartStart: Int
    dayPartEnd: Int
    requesterId: Int
    approverId: Int!
    leaveTypeId: Int!
  }

  input UpdateLeaveInput {
    status: Int
    employeeComment: String
    approverComment: String
    decidedAt: DateTime
    dateStart: DateTime
    dateEnd: DateTime
    dayPartStart: Int
    dayPartEnd: Int
    requesterId: Int
    approverId: Int
    leaveTypeId: Int
  }

  type Mutation {
    createLeave(input: CreateLeaveInput!): Leave! @requireAuth
    updateLeave(id: Int!, input: UpdateLeaveInput!): Leave! @requireAuth
    deleteLeave(id: Int!): Leave! @requireAuth
  }
`
