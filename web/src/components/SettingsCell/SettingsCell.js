import { useMutation } from '@redwoodjs/web'
import { Toaster, toast } from '@redwoodjs/web/toast'

import Settings from 'src/components/Settings'

export const QUERY = gql`
  query SettingsQuery($id: Int!) {
    countries {
      id
      name
    }
    leaveTypes {
      id
      name
      limit
      color
      useAllowance
      autoApprove
    }
    user: user(id: $id) {
      company {
        id
        name
        countryId
        shareAllAbsences
        isTeamViewHidden
        carryOver
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
      }
    }
  }
`

const UPDATE_COMPANY_DETAILS = gql`
  mutation UpdateCompanyDetails($id: Int!, $input: UpdateCompanyInput!) {
    updateCompany(id: $id, input: $input) {
      id
    }
  }
`

const UPDATE_COMPANY_SCHEDULE = gql`
  mutation UpdateCompanySchedule($id: Int!, $input: UpdateScheduleInput!) {
    updateSchedule(id: $id, input: $input) {
      id
    }
  }
`

const CREATE_COMPANY_SCHEDULE = gql`
  mutation CreateCompanySchedule($input: CreateScheduleInput!) {
    createSchedule(input: $input) {
      id
    }
  }
`

const CARRY_OVER_ALLOWANCE_MUTATION = gql`
  mutation CarryOverAllowance {
    carryOverFromPreviousYear {
      year
    }
  }
`

const EDIT_LEAVE_TYPE_MUTATION = gql`
  mutation EditLeaveTypeMutation($id: Int!, $input: UpdateLeaveTypeInput!) {
    updateLeaveType(id: $id, input: $input) {
      id
    }
  }
`

const ADD_NEW_LEAVE_TYPE_MUTATION = gql`
  mutation AddNewLeaveTypeMutation($input: CreateLeaveTypeInput!) {
    createLeaveType(input: $input) {
      id
    }
  }
`

export const Loading = () => <div className="loader"></div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ countries, user, leaveTypes }) => {
  const { company } = user
  const { schedule } = company

  const [carryOverAllowance] = useMutation(CARRY_OVER_ALLOWANCE_MUTATION, {
    onCompleted: () => {
      toast.success('Allowance successfully carried')
    },
    onError: () => {
      toast.error('Error carrying')
    },
  })

  const [addNewLeaveType] = useMutation(ADD_NEW_LEAVE_TYPE_MUTATION, {
    onCompleted: () => {
      toast.success('Operation successful')
    },
    onError: () => {
      toast.error('Error occurred')
    },
  })

  const [editLeaveType] = useMutation(EDIT_LEAVE_TYPE_MUTATION, {
    onCompleted: () => {
      toast.success('Operation successful')
    },
    onError: () => {
      toast.error('Error occurred')
    },
  })

  const [
    updateCompanyDetails,
    { loading: updateCompanyLoading, error: updateCompanyError },
  ] = useMutation(UPDATE_COMPANY_DETAILS, {
    onCompleted: () => {
      toast.success('Update company success')
    },
    onError: () => {
      toast.error('Error occurred')
    },
  })

  const [createSchedule] = useMutation(CREATE_COMPANY_SCHEDULE, {
    onCompleted: () => {
      toast.success('Schedule override success')
    },
    onError: () => {
      toast.error('Error occured')
    },
  })

  const [updateSchedule] = useMutation(UPDATE_COMPANY_SCHEDULE, {
    onCompleted: () => {
      toast.success('Schedule override success')
    },
    onError: () => {
      toast.error('Error occured')
    },
  })

  const updateCompany = (input) => {
    updateCompanyDetails({
      variables: {
        id: company.id,
        input: input,
      },
    })
  }

  const onLeaveChange = (leavesToUpdate, newLeaves) => {
    if (leavesToUpdate) {
      leavesToUpdate.map((leave) => {
        const { id, ...other } = leave
        editLeaveType({
          variables: {
            id: id,
            input: { ...other },
          },
        })
      })
    }
    if (newLeaves) {
      newLeaves.map((leave) => {
        const { id, ...other } = leave
        addNewLeaveType({
          variables: {
            id: id,
            input: { companyId: company.id, ...other },
          },
        })
      })
    }
  }

  const overrideSchedule = (input) => {
    if (schedule) {
      updateSchedule({
        variables: {
          id: schedule.id,
          input: { companyId: company.id, ...input },
        },
      })
    } else {
      createSchedule({
        variables: {
          input: { companyId: company.id, ...input },
        },
      })
    }
  }

  const onCarryOver = () => {
    carryOverAllowance()
  }

  return (
    <>
      <Toaster />
      <Settings
        countries={countries}
        updateCompanyDetails={updateCompany}
        updateCompanyLoading={updateCompanyLoading}
        updateCompanyError={updateCompanyError}
        schedule={schedule}
        onCarryOver={onCarryOver}
        overrideSchedule={overrideSchedule}
        company={company}
        onLeaveChange={onLeaveChange}
        leaveTypes={leaveTypes}
      />
    </>
  )
}
