import { useEffect, useState } from 'react'

import { useAuth } from '@redwoodjs/auth'
import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import Register from 'src/components/Register'

export const QUERY = gql`
  query FindRegisterQuery {
    countries: countries {
      id
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
const EMAIL_USER_MUTATION = gql`
  mutation EmailUserMutation($id: Int!, $input: EmailUserInput!) {
    emailUser(id: $id, input: $input) {
      id
    }
  }
`

const ADD_DEPARTMENT_SUPERVISOR_MUTATION = gql`
  mutation AddDepartmentSupervisorMutation(
    $input: CreateDepartmentSupervisorInput!
  ) {
    createDepartmentSupervisor(input: $input) {
      userId
      departmentId
    }
  }
`

const ADD_DEPARTMENT_MUTATION = gql`
  mutation AddDepartmentMutation($input: CreateDepartmentInput!) {
    createDepartment(input: $input) {
      id
    }
  }
`

export const Loading = () => <div className="loader"></div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ countries }) => {
  const { isAuthenticated, signUp } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.calendar())
    }
  })

  const [userData, setUserData] = useState(null)
  const [userEmailData, setUserEmailData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [deptName, setDeptName] = useState('')
  const [companyId, setCompanyId] = useState(null)
  const [emailUser] = useMutation(EMAIL_USER_MUTATION, {
    onCompleted: () => {
      toast.success('Company request created')
    },
    onError: () => {
      toast.error('Unable to create request')
    },
  })
  const [createDepartmentSupervisor] = useMutation(
    ADD_DEPARTMENT_SUPERVISOR_MUTATION,
    {
      onCompleted: () => {
        emailUser({
          variables: {
            id: 1,
            input: userEmailData,
          },
        })
      },
      onError: () => {
        toast.error('Unable to create request')
      },
    }
  )

  const [createDepartment] = useMutation(ADD_DEPARTMENT_MUTATION, {
    onCompleted: async (data) => {
      const response = await signUp({
        ...userData,
        companyId: companyId,
        departmentId: data.createDepartment.id,
      })
      if (response.message) {
        createDepartmentSupervisor({
          variables: {
            input: {
              userId: response.message,
              departmentId: data.createDepartment.id,
            },
          },
        })
      } else if (response.error) {
        toast.error(response.error)
        setLoading(false)
      }
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const [createCompany] = useMutation(CREATE_COMPANY, {
    onCompleted: (data) => {
      setCompanyId(data.createCompany.id)
      setLoading(true)
      createDepartment({
        variables: {
          input: {
            name: deptName,
            allowance: 20,
            includePublicHolidays: true,
            companyId: data.createCompany.id,
          },
        },
      })
    },
  })

  const onSubmit = (data) => {
    setDeptName(data.Department)
    setUserData({
      username: data.Email,
      password: data.Password,
      firstName: data['First name'],
      lastName: data['Last name'],
      isActivated: false,
      isAdmin: true,
      isAutoApprove: true,
      roles: 'manager',
    })
    createCompany({
      variables: {
        company: {
          name: data['Company name'],
          countryId: parseInt(data.country),
          timezone: data.timezone,
          companyWideMessage: data['Company info'],
        },
      },
    })
    setUserEmailData({
      email: data.Email,
      firstName: data['First name'],
      lastName: data['Last name'],
      name: data['Company name'],
      companyWideMessage: data['Company info'],
    })
  }

  return (
    <>
      <Toaster />
      <Register onSubmit={onSubmit} countries={countries} loading={loading} />
    </>
  )
}
