import { useMutation } from '@redwoodjs/web'
import { Toaster, toast } from '@redwoodjs/web/toast'

import EmployeeNotifications from 'src/components/EmployeeNotifications'

export const QUERY = gql`
  query EmployeeNotificationsQuery($id: Int!) {
    user: user(id: $id) {
      notifications {
        id
        createdAt
        text
        seen
        seenAt
      }
    }
  }
`

const UPDATE_NOTIFICATION_MUTATION = gql`
  mutation UpdateNotificationMutation(
    $id: Int!
    $input: UpdateNotificationInput!
  ) {
    updateNotification(id: $id, input: $input) {
      id
    }
  }
`

const DELETE_NOTIFICATION_MUTATION = gql`
  mutation DeleteNotification($id: Int!) {
    deleteNotification(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ user }) => {
  const { notifications } = user
  const [updateNotification] = useMutation(UPDATE_NOTIFICATION_MUTATION, {
    onCompleted: () => {
      window.location.reload()
    },
    onError: () => {
      toast.error('Something went wrong')
    },
  })

  const [deleteNotification] = useMutation(DELETE_NOTIFICATION_MUTATION, {
    onCompleted: () => {
      window.location.reload()
    },
    onError: () => {
      toast.error('Something went wrong')
    },
  })

  const onUpdate = (input) => {
    updateNotification({
      variables: {
        id: input.id,
        input: {
          seen: input.seen,
          seenAt: input.seen ? new Date() : null,
        },
      },
    })
  }

  const onDelete = (input) => {
    deleteNotification({
      variables: {
        id: input.id,
      },
    })
  }

  return (
    <>
      <Toaster />
      <EmployeeNotifications
        onUpdate={onUpdate}
        onDelete={onDelete}
        notifications={notifications
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))}
      />
    </>
  )
}
