export const schema = gql`
  type Notification {
    id: Int!
    text: String!
    seen: Boolean!
    createdAt: DateTime!
    seenAt: DateTime
    userId: Int!
    user: User!
  }

  type Query {
    notifications: [Notification!]! @requireAuth
    notification(id: Int!): Notification @requireAuth
  }

  input CreateNotificationInput {
    text: String!
    seen: Boolean!
    seenAt: DateTime
    userId: Int!
  }

  input UpdateNotificationInput {
    seen: Boolean
    seenAt: DateTime
  }

  type Mutation {
    createNotification(input: CreateNotificationInput!): Notification!
      @requireAuth
    updateNotification(
      id: Int!
      input: UpdateNotificationInput!
    ): Notification! @requireAuth
    deleteNotification(id: Int!): Notification! @requireAuth
  }
`
