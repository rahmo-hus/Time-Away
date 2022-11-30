export const schema = gql`
  type UserAllowanceAdjustment {
    id: Int!
    year: Int
    adjustment: Int
    carriedOverAllowance: Int
    createdAt: DateTime!
    userId: Int!
    user: User!
  }

  type Query {
    userAllowanceAdjustments: [UserAllowanceAdjustment!]! @requireAuth
    userAllowanceAdjustment(id: Int!): UserAllowanceAdjustment @requireAuth
  }

  input CreateUserAllowanceAdjustmentInput {
    year: Int
    adjustment: Int
    carriedOverAllowance: Int
    userId: Int!
  }

  input UpdateUserAllowanceAdjustmentInput {
    year: Int
    adjustment: Int
    carriedOverAllowance: Int
    userId: Int
  }

  type Mutation {
    createUserAllowanceAdjustment(
      input: CreateUserAllowanceAdjustmentInput!
    ): UserAllowanceAdjustment! @requireAuth
    updateUserAllowanceAdjustment(
      id: Int!
      input: UpdateUserAllowanceAdjustmentInput!
    ): UserAllowanceAdjustment! @requireAuth
    deleteUserAllowanceAdjustment(id: Int!): UserAllowanceAdjustment!
      @requireAuth
    carryOverFromPreviousYear: UserAllowanceAdjustment! @requireAuth
  }
`
