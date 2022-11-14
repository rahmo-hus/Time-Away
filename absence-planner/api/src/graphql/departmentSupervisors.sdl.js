export const schema = gql`
  type DepartmentSupervisor {
    createdAt: DateTime!
    userId: Int!
    departmentId: Int!
    user: User!
    department: Department!
  }

  type Query {
    departmentSupervisors: [DepartmentSupervisor!]! @requireAuth
  }

  input CreateDepartmentSupervisorInput {
    userId: Int!
    departmentId: Int!
  }

  input UpdateDepartmentSupervisorInput {
    userId: Int
    departmentId: Int
  }
`
