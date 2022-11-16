import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'
import EditDepartment from 'src/components/EditDepartment'
import {routes, navigate} from '@redwoodjs/router'

export const QUERY = gql`
  query FindEditDepartmentQuery($id: Int!) {
    department: department(id: $id) {
      id,
      name,
      allowance,
      departmentSupervisor{
        user{
          id,
          firstName,
          lastName
        }
      },
      includePublicHolidays,
      company{
        id,
        employees{
          id,
          firstName,
          lastName
        }
      }
    }
  }
`
const UPDATE_DEPARTMENT_MUTATION = gql`
    mutation UpdateDepartmentMutation($id:Int!, $input: UpdateDepartmentInput!){
      updateDepartment(id: $id, input: $input){
        id
      }
    }
`

const DELETE_DEPARTMENT_MUTATION = gql`
    mutation DeleteDepartmentMutation($id: Int!){
      deleteDepartment(id: $id){
        id
      }
    }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ department }) => {

  const {company} = department;

  const [updateDepartment, { loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_DEPARTMENT_MUTATION, {
      onCompleted: () => {
        toast('Department successfully updated')
      }
    })

  const [deleteDepartment, {loading: deleteLoading, error: deleteError}] =
    useMutation(DELETE_DEPARTMENT_MUTATION, {
      onCompleted: () => {
        navigate(routes.departments());
      },
      onError:(error)=>{
        toast.error('Unable to delete department. It is necessary to remove employees first.')
      }
    })

  const onUpdate = input => {
    updateDepartment({
      variables: {
        id: department.id,
        input: {
          name: input["Department name"],
          allowance: parseInt(input.allowance),
          includePublicHolidays: input.includePublicHolidays,
          isAccruedAllowance: false,
          companyId: company.id
        }
      }
    })
  }

  const onDelete = () => {
    deleteDepartment({
      variables:{
        id: department.id
      }
    })
  }

  return <>
    <Toaster />
    <EditDepartment department={department}
      onUpdate={onUpdate}
      onDelete={onDelete}
      error={updateError || deleteError}
      loading={updateLoading}
      deleteLoading={deleteLoading} />
  </>
}
