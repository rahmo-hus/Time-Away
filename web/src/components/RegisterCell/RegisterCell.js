import Register from 'src/components/Register'
import { toast, Toaster } from '@redwoodjs/web/toast'
import { useMutation } from '@redwoodjs/web'
import { Link, routes, navigate } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import { useState, useEffect } from 'react';

export const QUERY = gql`
  query FindRegisterQuery {
      countries: countries{
        id,
        name
      }
  }
`

const CREATE_COMPANY = gql`
  mutation CreateCompanyMutation($company: CreateCompanyInput!) {
    createCompany(input: $company) {
      id
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

export const Success = ({ countries }) => {

  const { isAuthenticated, signUp } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.calendar())
    }
  }, [])

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deptName, setDeptName] = useState('');
  const [companyId, setCompanyId] = useState(null);

  const [createDepartmentSupervisor] =
    useMutation(ADD_DEPARTMENT_SUPERVISOR_MUTATION, {
      onCompleted: () => {
        toast.success("Company created successfully");
      },
      onError: (error) => {
        toast.error('Unable to add new company')
      }
    })

  const [createDepartment] =
    useMutation(ADD_DEPARTMENT_MUTATION, {
      onCompleted: async (data) => {
        const response = await signUp({ ...userData, companyId: companyId, departmentId: data.createDepartment.id });
        if (response.message) {
          createDepartmentSupervisor({
            variables: {
              input: {
                userId: response.message,
                departmentId: data.createDepartment.id
              }
            }
          })
        } else if (response.error) {
          toast.error(response.error);
          setLoading(false);
        }
      },
      onError: (error) => {
        toast.error(error);
      }
    })

  const [createCompany] = useMutation(CREATE_COMPANY, {
    onCompleted: (data) => {
      setCompanyId(data.createCompany.id);
      setLoading(true);
      createDepartment({
        variables: {
          input: {
            name: deptName,
            allowance: 20,
            includePublicHolidays: true,
            isAccruedAllowance: false,
            companyId: data.createCompany.id
          }
        }
      });

    }
  });

  const onSubmit = (data) => {
    setDeptName(data.Department);
    setUserData({
      username: data.Email,
      password: data.Password,
      firstName: data["First name"],
      lastName: data["Last name"],
      isActivated: true,
      isAdmin: true,
      isAutoApprove: true,
      roles: 'manager'
    });

    createCompany({
      variables: {
        company: {
          name: data["Company name"],
          country: data.country,
          timezone: data.timezone,
          companyWideMessage: data["Company info"]
        }
      }
    });
  }

  return <>
    <Toaster />
    <Register onSubmit={onSubmit} loading={loading} />
  </>
}
