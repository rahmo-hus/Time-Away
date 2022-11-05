import EditEmployee from "src/components/EditEmployee"
import { useState } from 'react'
import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

export const QUERY = gql`
  query EditEmployeeQuery($id: Int!) {
    user: user(id: $id){
      id,
      firstName,
      lastName,
      email,
      isAutoApprove,
      isAdmin,
      startDate,
      departmentId,
      company{
        id,
        departments{
          id,
          name
        }
      }
  }
}
`

const UPDATE_USER_MUTATION = gql`
    mutation UpdateUserData($id: Int!, $input: UpdateUserInput!){
        updateUser(id: $id, input: $input){
          id,
          firstName,
          lastName,
          email,
          isAutoApprove,
          isAdmin,
          startDate,
          departmentId,
          roles
        }
    }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ user, id }) => {

  const [updateUser, { loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_USER_MUTATION, {
      onCompleted: () => {
        //TODO: add password reset
        navigate(routes.viewEmployees());
      }
    })

  const onSubmit = (input) => {

    updateUser({
      variables: {
        id: id,
        input: {
          email: input.Email,
          firstName: input["First name"],
          lastName: input["Last name"],
          isAdmin: input.admin,
          startDate: input["Start date"],
          roles: input.admin ? 'manager' : 'employee',
          isAutoApprove: input.auto_approve,
          departmentId: parseInt(input.Department)
        }
      }
    })
  }

  const deleteEmployee = () => {

  }

  return <EditEmployee
    user={user}
    onSubmit={onSubmit}
    deleteEmployee={deleteEmployee}
    loading={updateLoading}
    error={updateError}
  />
}
