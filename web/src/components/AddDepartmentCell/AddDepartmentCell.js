import AddDepartment from "src/components/AddDepartment"
import { toast, Toaster } from '@redwoodjs/web/toast'
import { useMutation } from "@redwoodjs/web"
import { useState } from "react"


export const QUERY = gql`
query UsersDepartmentQuery($companyId: Int!) {
  users: usersByCompanyId(companyId: $companyId){
      id,
      firstName,
      lastName
    }
  }
`
const ADD_DEPARTMENT_SUPERVISOR_MUTATION = gql`
    mutation AddDepartmentSupervisorMutation($input: CreateDepartmentSupervisorInput!){
      createDepartmentSupervisor(input: $input){
        userId,
        departmentId
      }
    }
`


const ADD_DEPARTMENT_MUTATION = gql`
    mutation AddDepartmentMutation($input: CreateDepartmentInput!){
      createDepartment(input: $input){
        id
      }
    }
`



export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ users, companyId }) => {

  const [departmentSupervisorId, setDepartmentSupervisorId] = useState(null);

  const [createDepartmentSupervisor, { loading: createDepartmentSupervisorLoading, error: createDepartmentSupervisorError }] =
    useMutation(ADD_DEPARTMENT_SUPERVISOR_MUTATION, {
      onCompleted: () => {
        toast.success('Department successfully created')
      },
      onError: (error) => {
        toast.error('Unable to add new department')
      }
    })

  const [createDepartment, { loading: loading, error: error }] =
    useMutation(ADD_DEPARTMENT_MUTATION, {
      onCompleted: (response) => {
        createDepartmentSupervisor({
          variables: {
            input: {
              userId: departmentSupervisorId,
              departmentId: response.createDepartment.id
            }
          }
        })
      },
      onError: (error) => {
        toast.error(error);
      }
    })


  const onSubmit = input => {
    setDepartmentSupervisorId(parseInt(input["Department supervisor"]));
    createDepartment({
      variables: {
        input: {
          name: input.name,
          allowance: parseInt(input.allowance),
          includePublicHolidays: input.includePublicHolidays,
          isAccruedAllowance: input.isAccruedAllowance,
          companyId: companyId
        }
      }
    });
  }

  return <>
    <Toaster />
    <AddDepartment
      addDepartment={onSubmit}
      users={users}
      loading={loading}
    />
  </>
}
