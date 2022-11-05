import {Link, routes} from '@redwoodjs/router';
import {useState, useEffect} from 'react';

const EditEmployee = ({user}) => {

  const [selectedItem, setSelectedItem] = useState(0);

  useEffect(() =>{
    console.log(user);
  })

  const deleteEmployee = () => {

  }

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
        <Link className={'list-group-item '+(selectedItem === 0 ? 'selected-item' : '')} >General details</Link>
        <a href="/users/edit/{{employee.id}}/" className="list-group-item{{# if show_main_tab }} selected-item{{/if}}">General details</a>
        <a href="/users/edit/{{employee.id}}/schedule/" className="list-group-item {{# if show_schedule_tab }} selected-item{{/if}}">Schedule</a>
        <a href="/users/edit/{{employee.id}}/calendar/" className="list-group-item {{# if show_calendar_tab }} selected-item{{/if}}">Calendar</a>
        <a href="/users/edit/{{employee.id}}/absences/" className="list-group-item{{# if show_absence_tab }} selected-item{{/if}}">Absences</a>
      </div>


    </div>
  )
}

export default EditEmployee
