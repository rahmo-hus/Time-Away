import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'
import EditDepartment from 'src/components/EditDepartment'

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

  const onSubmit = input => {
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

  return <>
    <Toaster />
    <EditDepartment department={department}
      onSubmit={onSubmit}
      error={updateError}
      loading={updateLoading} />
  </>
}
