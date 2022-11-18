import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import EditEmployee from 'src/components/EditEmployee'

export const QUERY = gql`
  query EditEmployeeQuery($id: Int!) {
    leaves: leavesByUserId(userId: $id) {
      id
      status
      employeeComment
      approverComment
      dateStart
      dateEnd
      approver {
        firstName
        lastName
      }
      leaveType {
        id
        name
        color
        limit
      }
    }
    leaveTypes: leaveTypes {
      id
      name
      color
    }
    user: user(id: $id) {
      id
      firstName
      lastName
      email
      isAutoApprove
      isAdmin
      startDate
      departmentId
      department {
        id
        name
        allowance
        isAccruedAllowance
      }
      schedule {
        id
        monday
        tuesday
        wednesday
        thursday
        friday
        saturday
        sunday
      }
      allowanceAdjustment {
        id
        year
        adjustment
        carriedOverAllowance
      }
      company {
        id
        departments {
          id
          name
        }
      }
    }
  }
`

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUserData($id: Int!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      firstName
      lastName
      email
      isAutoApprove
      isAdmin
      startDate
      departmentId
      roles
    }
  }
`

const UPDATE_ALLOWANCE_ADJUSTMENT = gql`
  mutation UpdateAllowanceAdjustment(
    $id: Int!
    $input: UpdateUserAllowanceAdjustmentInput!
  ) {
    updateUserAllowanceAdjustment(id: $id, input: $input) {
      userId
    }
  }
`

const CREATE_ALLOWANCE_ADJUSTMENT = gql`
  mutation CreateAllowanceAdjustment(
    $input: CreateUserAllowanceAdjustmentInput!
  ) {
    createUserAllowanceAdjustment(input: $input) {
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

// export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ user, leaveTypes, leaves, id }) => {
  const { allowanceAdjustment } = user

  const [updateUser, { loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_USER_MUTATION, {
      onCompleted: () => {
        //TODO: add password reset
        navigate(routes.viewEmployees())
      },
    })

  const [
    updateAllowanceAdjustment,
    {
      loading: updateAllowanceAdjustmentLoading,
      error: updateAllowanceAdjustmentError,
    },
  ] = useMutation(UPDATE_ALLOWANCE_ADJUSTMENT, {
    onCompleted: () => {
      toast('Allowance adjustment update success')
    },
  })

  const [
    createAllowanceAdjustment,
    {
      loading: createAllowanceAdjustmentLoading,
      error: createAllowanceAdjustmentError,
    },
  ] = useMutation(CREATE_ALLOWANCE_ADJUSTMENT, {
    onCompleted: () => {
      toast('Allowance adjustment update success')
    },
  })

  const submitAllowanceAdjustment = (input) => {
    if (allowanceAdjustment) {
      updateAllowanceAdjustment({
        variables: {
          id: allowanceAdjustment.id,
          input: {
            year: new Date().getFullYear(),
            adjustment: input.allowanceAdjustment,
          },
        },
      })
    } else {
      createAllowanceAdjustment({
        variables: {
          input: {
            userId: user.id,
            carriedOverAllowance: 0,
            year: new Date().getFullYear(),
            adjustment: input.allowanceAdjustment,
          },
        },
      })
    }
  }
  const updateUserData = (input) => {
    updateUser({
      variables: {
        id: id,
        input: {
          email: input.Email,
          firstName: input['First name'],
          lastName: input['Last name'],
          isAdmin: input.admin,
          startDate: input['Start date'],
          roles: input.admin ? 'manager' : 'employee',
          isAutoApprove: input.auto_approve,
          departmentId: parseInt(input.Department),
        },
      },
    })
  }

  const deleteEmployee = () => {}
  return (
    <>
      <Toaster />
      <EditEmployee
        user={user}
        onSubmit={updateUserData}
        leaveTypes={leaveTypes}
        allowanceAdjustment={allowanceAdjustment}
        leaves={leaves}
        deleteEmployee={deleteEmployee}
        loading={updateLoading}
        error={updateError}
        allowanceAdjustmentChangeLoading={
          updateAllowanceAdjustmentLoading || createAllowanceAdjustmentLoading
        }
        allowanceAdjustmentChangeError={
          updateAllowanceAdjustmentError || createAllowanceAdjustmentError
        }
        submitAllowanceAdjustment={submitAllowanceAdjustment}
      />
    </>
  )
}
