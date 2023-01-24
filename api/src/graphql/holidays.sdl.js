export const schema = gql`
  type Holiday {
    id: Int!
    name: String!
    date: DateTime!
    createdAt: DateTime!
    updatedAt: DateTime
    companyId: Int!
    company: Company!
  }

  type Query {
    holidays: [Holiday!]! @requireAuth
    holiday(id: Int!): Holiday @requireAuth
  }

  input CreateHolidayInput {
    name: String!
    date: DateTime!
    companyId: Int!
  }

  input UpdateHolidayInput {
    name: String
    date: DateTime
    companyId: Int
  }

  type Mutation {
    createHoliday(input: CreateHolidayInput!): Holiday! @requireAuth
    updateHoliday(id: Int!, input: UpdateHolidayInput!): Holiday! @requireAuth
    deleteHoliday(id: Int!): Holiday! @requireAuth
  }
`
