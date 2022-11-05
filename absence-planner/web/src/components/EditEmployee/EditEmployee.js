import { Link, routes } from '@redwoodjs/router';
import { useState, useEffect } from 'react';
import GeneralDetails from '../GeneralDetails/GeneralDetails';

const EditEmployee = ({ user, onSubmit, deleteEmployee, loading, error }) => {

  const [selectedItem, setSelectedItem] = useState(0);

  return (
    <div>
      <div className="row">
        <div className="col-md-3 lead">Employee details</div>
        <div className="col-md-1 col-md-offset-8">
          <button className="pull-right btn btn-danger single-click"
            data-toggle="tooltip"
            data-placement="top"
            onClick={deleteEmployee}
          >
            <i className="fa fa-trash"></i> Delete
          </button>
        </div>
      </div>
      <div className="row"></div>

      {/* flash messages */}

      <div className="col-md-3 list-group">
        <button onClick={() => setSelectedItem(0)} className={'list-group-item ' + (selectedItem === 0 ? 'selected-item' : '')}>General details</button>
        <button onClick={() => setSelectedItem(1)} className={'list-group-item ' + (selectedItem === 1 ? 'selected-item' : '')}>Schedule</button>
        <button onClick={() => setSelectedItem(2)} className={'list-group-item ' + (selectedItem === 2 ? 'selected-item' : '')}>Calendar</button>
        <button onClick={() => setSelectedItem(3)} className={'list-group-item ' + (selectedItem === 3 ? 'selected-item' : '')}>Absences</button>
      </div>

      {
        selectedItem === 0 ?
          <GeneralDetails user={user}
            onSubmit={onSubmit}
            error={error}
            loading={loading} /> : <></>
      }

    </div>
  )
}

export default EditEmployee
