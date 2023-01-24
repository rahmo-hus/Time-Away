/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react'

import {
  Form,
  Label,
  TextField,
  CheckboxField,
  Submit,
  RadioField,
  NumberField,
} from '@redwoodjs/forms'

const LeaveType = ({ leaveType, index, setLeaveTypes, leaveTypes }) => {
  const [localLeaveType, setLocalLeaveType] = useState({ ...leaveType })

  const updateLeaves = () => {
    const leaves = [...leaveTypes]
    const thisLeaveIndex = leaves.findIndex((i) => i.id === localLeaveType.id)
    leaves.splice(thisLeaveIndex, 1)
    leaves.push(localLeaveType)
    setLeaveTypes(leaves)
  }

  return (
    <div className="row" key={localLeaveType.id}>
      <div className="col-md-6" style={{ marginBottom: 20 }}>
        <div className="input-group">
          <span className="input-group-addon">
            <RadioField name="first_record"></RadioField>
          </span>
          <TextField
            className="form-control"
            name={'name' + localLeaveType.id}
            defaultValue={localLeaveType.name}
            onChange={(e) => {
              localLeaveType.name = e.target.value
              setLocalLeaveType({ ...localLeaveType })
              updateLeaves()
            }}
          />

          <div className="input-group-btn" data-tom-color-picker="1">
            <button
              className={
                'btn btn-default dropdown-toggle leave_type_color_' +
                localLeaveType.color
              }
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fa fa-paint-brush"></i>
            </button>
            <ul className="dropdown-menu">
              <li>
                <a
                  onClick={() => {
                    localLeaveType.color = '1'
                    setLocalLeaveType({ ...localLeaveType })
                    updateLeaves()
                  }}
                  className="btn leave_type_color_1"
                >
                  Color 1
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    localLeaveType.color = '2'
                    setLocalLeaveType({ ...localLeaveType })
                    updateLeaves()
                  }}
                  className="btn btn-default leave_type_color_2"
                >
                  Color 2
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    localLeaveType.color = '3'
                    setLocalLeaveType({ ...localLeaveType })
                    updateLeaves()
                  }}
                  className="btn btn-default leave_type_color_3"
                >
                  Color 3
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    localLeaveType.color = '4'
                    setLocalLeaveType({ ...localLeaveType })
                    updateLeaves()
                  }}
                  className="btn btn-default leave_type_color_4"
                >
                  Color 4
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    localLeaveType.color = '5'
                    setLocalLeaveType({ ...localLeaveType })
                    updateLeaves()
                  }}
                  className="btn btn-default leave_type_color_5"
                >
                  Color 5
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div>
          <Label
            name={'useAllowance' + localLeaveType.id}
            className="control-label"
            style={{ marginBottom: 0, marginTop: -6 }}
          >
            Use allowance
            <CheckboxField
              name={'useAllowance' + localLeaveType.id}
              defaultChecked={localLeaveType.useAllowance}
              style={{ marginLeft: 10 }}
              onChange={(e) => {
                localLeaveType.useAllowance = e.target.value === 'on'
                setLocalLeaveType({ ...localLeaveType })
                updateLeaves()
              }}
            />
          </Label>
        </div>
        <div>
          <Label name={'autoApprove' + index} className="control-label">
            Auto approve
            <CheckboxField
              name={'autoApprove' + index}
              style={{ marginLeft: 16 }}
              defaultChecked={localLeaveType.autoApprove}
              onChange={(e) => {
                localLeaveType.autoApprove = e.target.value === 'on'
                setLocalLeaveType({ ...localLeaveType })
                updateLeaves()
              }}
            />
          </Label>
        </div>
      </div>
      <div className="col-md-2">
        <NumberField
          name={'number' + localLeaveType.id}
          defaultValue={localLeaveType.limit}
          onChange={(e) => {
            localLeaveType.limit = parseInt(e.target.value)
            setLocalLeaveType({ ...localLeaveType })
            updateLeaves()
          }}
          className="form-control"
        />
      </div>
      <div className="col-md-1">
        <button
          className="btn btn-default pull-right leavetype-remove-btn"
          value="this"
          onClick={() => {
            const leaves = [...leaveTypes]
            const thisLeaveIndex = leaves.findIndex(
              (i) => i.id === leaveType.id
            )
            leaves.splice(thisLeaveIndex, 1)
            setLeaveTypes(leaves)
          }}
        >
          <span className="fa fa-remove"></span>
        </button>
      </div>
    </div>
  )
}

const LeaveTypeInput = ({ leaveTypes, onLeaveChange }) => {
  const [localLeaveTypes, setLocalLeaveTypes] = useState([])
  const [newLeaveTypes, setNewLeaveTypes] = useState([])

  useEffect(() => {
    if (leaveTypes && localLeaveTypes.length === 0) {
      leaveTypes.map((element) => {
        const { __typename, ...other } = element
        localLeaveTypes.push({ ...other })
      })
    }
  })

  const onSubmit = () => {
    const leaveTypesWithoutTypename = leaveTypes.map((e) => {
      const { __typename, ...other } = e
      return { ...other }
    })
    const localLeaves = localLeaveTypes.filter(
      (obj) =>
        leaveTypesWithoutTypename.filter(
          (o) => JSON.stringify(o) === JSON.stringify(obj)
        ).length === 0
    )

    // JSON.stringify(localLeaveTypes) ===
    // JSON.stringify(leaveTypesWithoutTypename)
    //   ? null
    //   : localLeaveTypes
    const newLeaves = newLeaveTypes.length === 0 ? null : newLeaveTypes
    console.log(localLeaves)
    onLeaveChange(localLeaves, newLeaves)
  }

  return (
    <div>
      <div className="col-md-7">
        <div className="panel panel-default">
          <div className="panel-heading">Leave Types</div>
          <div className="panel-body">
            <div className="row">
              <div className="col-md-6">
                <div className="control-label">Leave Type Name</div>
                <p>
                  <em>Tick one to always be on top of the list</em>
                </p>
              </div>
              <div className="col-md-offset-3 col-md-2">
                <div className="control-label">Limit</div>
                <p>
                  <em>Days/year</em>
                </p>
              </div>
            </div>

            <div className="row">&nbsp;</div>

            <Form>
              {!localLeaveTypes ? (
                <div className="row">
                  <div className="col-md-4">No Leave type records</div>
                </div>
              ) : (
                <>
                  {localLeaveTypes.map((leaveType, key) => {
                    return (
                      <LeaveType
                        key={key}
                        leaveTypes={localLeaveTypes}
                        index={key}
                        setLeaveTypes={setLocalLeaveTypes}
                        leaveType={leaveType}
                      />
                    )
                  })}

                  {newLeaveTypes.map((leaveType, key) => (
                    <LeaveType
                      key={key}
                      leaveTypes={newLeaveTypes}
                      setLeaveTypes={setNewLeaveTypes}
                      leaveType={leaveType}
                    ></LeaveType>
                  ))}
                </>
              )}

              <div className="row">&nbsp;</div>
              <div className="row">&nbsp;</div>
              <div className="row">
                <div className="col-md-12">
                  <div className="pull-right">
                    <button
                      className="btn btn-default"
                      onClick={() => {
                        const ids = localLeaveTypes
                          .concat(newLeaveTypes)
                          .map((o) => o.id)

                        const nextId =
                          ids.length !== 0 ? Math.max(...ids) + 1 : 1
                        newLeaveTypes.push({
                          name: 'New leave type ' + nextId,
                          id: nextId,
                          color: '1',
                          limit: 0,
                          useAllowance: false,
                          autoApprove: false,
                        })
                        const temp = []
                        newLeaveTypes.map((t) => temp.push(t))
                        setNewLeaveTypes(temp)
                      }}
                    >
                      Add new
                    </button>
                    <Submit
                      onClick={onSubmit}
                      className="btn btn-success single-click"
                    >
                      Save changes
                    </Submit>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeaveTypeInput
