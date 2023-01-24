import { useState } from 'react'

import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

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

export const Loading = () => <div className="loader"></div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ user }) => {
  const { notifications } = user
  const [localNotifications, setLocalNotifications] = useState([
    ...notifications,
  ])

  const [updateNotification] = useMutation(UPDATE_NOTIFICATION_MUTATION, {
    onCompleted: () => {},
    onError: () => {
      toast.error('Something went wrong')
    },
  })

  const [deleteNotification] = useMutation(DELETE_NOTIFICATION_MUTATION, {
    onCompleted: () => {},
    onError: () => {
      toast.error('Something went wrong')
    },
  })

  const updateLocalNotification = (id, seen) => {
    const index = localNotifications.map((n) => n.id).indexOf(id)
    var temp = [...localNotifications]
    let requiredNotification = { ...temp[index] }
    requiredNotification.seen = seen
    temp[index] = requiredNotification
    setLocalNotifications(temp)
  }

  const removeLocalNotification = (id) => {
    const index = localNotifications.map((holiday) => holiday.id).indexOf(id)
    localNotifications.splice(index, 1)
    setLocalNotifications([...localNotifications])
  }

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
    updateLocalNotification(input.id, input.seen)
  }

  const onDelete = (input) => {
    deleteNotification({
      variables: {
        id: input.id,
      },
    })
    removeLocalNotification(input.id)
  }

  return (
    <>
      <Toaster />
      <EmployeeNotifications
        onUpdate={onUpdate}
        onDelete={onDelete}
        notifications={localNotifications
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))}
      />
    </>
  )
}
