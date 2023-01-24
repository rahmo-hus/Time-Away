import TeamView from 'src/components/TeamView'

export const beforeQuery = ({ userId }) => ({
  variables: { userId },
})

export const QUERY = gql`
  query FindTeamViewQuery($userId: Int!) {
    company: user(id: $userId) {
      company {
        id
        departments {
          id
          name
        }
        employees {
          id
          firstName
          lastName
          department {
            id
            name
          }
          approvedLeaves {
            id
            dateStart
            dateEnd
            status
            leaveType {
              id
              name
              color
            }
          }
          requestedLeaves {
            dateStart
            status
            dateEnd
            leaveType {
              id
              name
              color
            }
          }
        }
        holidays {
          name
          date
        }
      }
    }
  }
`

export const Loading = () => <div className="loader"></div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ company }) => {
  const { employees } = company.company
  return (
    <TeamView
      users={employees}
      holidays={company?.company?.holidays}
      departments={company?.company?.departments}
    />
  )
}
