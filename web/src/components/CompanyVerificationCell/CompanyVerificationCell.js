import { useState } from 'react'

import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

export const QUERY = gql`
  query FindCompanyVerificationQuery {
    companies: companies {
      id
      name
      companyWideMessage
      verified
      country {
        name
      }
      manager {
        id
        firstName
        lastName
        email
      }
    }
  }
`

const VERIFY_COMPANY_MUTATION = gql`
  mutation VerifyCompanyMutation($id: Int!, $input: VerifyCompanyInput!) {
    verifyCompany(id: $id, input: $input) {
      id
    }
  }
`

export const Loading = () => <div className="loader"></div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ companies: companiesPublic }) => {
  const [companies, setCompanies] = useState([...companiesPublic])
  const [updateParams, setUpdateParams] = useState(null)

  const updateCompaniesLocal = () => {
    const index = companies.map((n) => n.id).indexOf(updateParams.id)
    var temp = [...companies]
    let updatedCompany = { ...temp[index] }
    updatedCompany.verified = updateParams.status
    temp[index] = updatedCompany
    setCompanies(temp)
  }

  const [verifyCompany] = useMutation(VERIFY_COMPANY_MUTATION, {
    onCompleted: () => {
      toast.success('Action successful')
      updateCompaniesLocal()
    },
    onError: () => {
      toast.error('An error occurred')
    },
  })

  const onVerify = (id, status) => {
    verifyCompany({
      variables: {
        id: id,
        input: {
          verified: status,
        },
      },
    })
    setUpdateParams({ id: id, status: status })
  }

  return (
    <div>
      <Toaster />
      <div className="text-center">
        <h1>Company management</h1>
        <div className="lead">Enable or disable company accounts</div>
        <hr></hr>
      </div>
      <div className="col-md-12">
        <p className="visible-xs-block">
          <em className="text-muted">Scroll table horizontally</em>
        </p>
        <div className="table-responsive">
          <table className="table table-hover user-requests-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Manager</th>
                <th>Manager e-mail</th>
                <th>Country</th>
                <th></th>
                <th className="col-xs-2">Company info</th>
                <th>
                  <span>Status</span>
                </th>
                <th colSpan="2"></th>
              </tr>
            </thead>

            <tbody>
              {companies.map((company) => (
                <tr key={company.id}>
                  <td>{company.name}</td>
                  <td>
                    {company.manager?.firstName} {company.manager?.lastName}
                  </td>
                  <td>{company.manager?.email}</td>
                  <td>{company.country?.name}</td>
                  <td></td>
                  <td>{company.companyWideMessage}</td>
                  <td>{company.verified ? 'Verified' : 'Not verified'}</td>
                  <td colSpan="2">
                    {company.verified ? (
                      <button
                        className="btn btn-warning single-click"
                        onClick={() => onVerify(company.id, false)}
                      >
                        Disable
                      </button>
                    ) : (
                      <button
                        className="btn btn-success single-click"
                        onClick={() => onVerify(company.id, true)}
                      >
                        Enable
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
