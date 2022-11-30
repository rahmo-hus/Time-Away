export const schema = gql`
  type Schedule {
    id: Int!
    monday: Boolean!
    tuesday: Boolean!
    wednesday: Boolean!
    thursday: Boolean!
    friday: Boolean!
    saturday: Boolean!
    sunday: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime
    companyId: Int
    userId: Int
    company: Company
    user: User
  }

  type Query {
    schedules: [Schedule!]! @requireAuth
    schedule(id: Int!): Schedule @requireAuth
  }

  input CreateScheduleInput {
    monday: Boolean!
    tuesday: Boolean!
    wednesday: Boolean!
    thursday: Boolean!
    friday: Boolean!
    saturday: Boolean!
    sunday: Boolean!
    companyId: Int
    userId: Int
  }

  input UpdateScheduleInput {
    monday: Boolean
    tuesday: Boolean
    wednesday: Boolean
    thursday: Boolean
    friday: Boolean
    saturday: Boolean
    sunday: Boolean
    companyId: Int
    userId: Int
  }

  type Mutation {
    createSchedule(input: CreateScheduleInput!): Schedule! @requireAuth
    updateSchedule(id: Int!, input: UpdateScheduleInput!): Schedule!
      @requireAuth
    deleteSchedule(id: Int!): Schedule! @requireAuth
  }
`
