import { useState } from 'react'

import { useAuth } from '@redwoodjs/auth'
import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import NewAbsence from 'src/components/NewAbsence'

export const QUERY = gql`
  query UsersQuery($userId: Int!) {
    users {
      id
      firstName
      lastName
    }
    leaveTypes {
      id
      name
      color
    }
    user: user(id: $userId) {
      id
      department {
        departmentSupervisor {
          userId
        }
      }
    }
  }
`
const CREATE_APPROVED_LEAVE = gql`
  mutation CreateApprovedLeaveMutation($leave: CreateLeaveInput!) {
    createLeave(input: $leave) {
      id
    }
  }
`
export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ users, leaveTypes, user }) => {
  const { hasRole } = useAuth()
  const [submissionSuccess, setSubmissionSuccess] = useState(false)

  const determineAbsenceStatus = () => {
    return hasRole('manager') ? 2 : 1 //TODO add if it is auto approve check
  }

  const [createAbsenceRequest, { loading, error }] = useMutation(
    CREATE_APPROVED_LEAVE,
    {
      onCompleted: () => {
        toast.success('submission success')
        setSubmissionSuccess(true)
      },
    }
  )

  const onSubmit = (data) => {
    createAbsenceRequest({
      variables: {
        leave: {
          dateStart: data['Date from'],
          dateEnd: data['Date to'],
          approverId: user?.department?.departmentSupervisor?.userId,
          requesterId: hasRole('manager') ? parseInt(data.employee) : user.id,
          status: determineAbsenceStatus(),
          approverComment: hasRole('manager') ? data.reason : '',
          employeeComment: !hasRole('manager') ? data.reason : '',
          dayPartStart: parseInt(data.from_date_part),
          dayPartEnd: parseInt(data.to_date_part),
          leaveTypeId: parseInt(data.leave_type),
        },
      },
    })
  }

  return (
    <>
      <Toaster />
      <NewAbsence
        users={users}
        leaveTypes={leaveTypes}
        loading={loading}
        onSubmit={onSubmit}
        submissionSuccess={submissionSuccess}
        hasRole={hasRole}
        error={error}
      />
    </>
  )
}
