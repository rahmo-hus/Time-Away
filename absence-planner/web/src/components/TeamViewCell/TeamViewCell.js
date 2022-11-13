import TeamView from 'src/components/TeamView'

export const beforeQuery = ({ userId }) => ({
  variables: { userId }
})

export const QUERY = gql`
  query FindTeamViewQuery($userId: Int!) {
    company: user(id: $userId){
      company{
        id,
        departments{
          id,
          name
        }
      }
    },

    users: users {
      id,
      firstName,
      lastName,
      department{
        id,
        name
      },
      approvedLeaves{
        dateStart,
        dateEnd,
        leaveType{
          id,
          name,
          color
        }
      },
      requestedLeaves{
        dateStart,
        dateEnd,
        leaveType{
          id,
          name,
          color
        }
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ users, company }) => {
  return <TeamView users={users} departments = {company?.company?.departments} />
}
