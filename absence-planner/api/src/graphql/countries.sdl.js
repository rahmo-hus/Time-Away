export const schema = gql`
  type Country {
    id: Int!
    name: String!
  }

  type Query {
    countries: [Country!]! @skipAuth
  }

  input CreateCountryInput {
    name: String!
  }

  input UpdateCountryInput {
    name: String
  }
`
