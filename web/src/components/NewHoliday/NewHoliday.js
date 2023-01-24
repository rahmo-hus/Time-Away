import { DateField, Form, Label, Submit, TextField } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

const ADD_PUBLIC_HOLIDAY = gql`
  mutation CreatePublicHoliday($holiday: CreateHolidayInput!) {
    createHoliday(input: $holiday) {
      id
    }
  }
`

const NewHoliday = ({ companyId }) => {
  const [createLeave, { loading }] = useMutation(ADD_PUBLIC_HOLIDAY, {
    onCompleted: () => {
      toast.success('Added new public holiday')
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const onSubmit = (data) => {
    createLeave({
      variables: {
        holiday: {
          name: data.name,
          date: data.date,
          companyId: companyId,
        },
      },
    })
  }

  return (
    <div className="container flex-center">
      <Toaster />
      <div className="row">
        <div className="modal-header">
          <h2 className="modal-title">Add new public holiday</h2>
        </div>

        <Form onSubmit={onSubmit} className="modal-body">
          <div className="form-group">
            <Label htmlFor="name" className="control-label">
              Name:
            </Label>
            <TextField
              type="text"
              className="form-control"
              name="name"
              validation={{ required: true }}
            />
          </div>

          <div className="form-group">
            <Label name="date" className="control-label">
              Date:
            </Label>
            <DateField
              className="form-control"
              name="date"
              validation={{ required: true }}
            />
          </div>
          <div className="modal-footer">
            <Submit disabled={loading} className="btn btn-success single-click">
              Create
            </Submit>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default NewHoliday
