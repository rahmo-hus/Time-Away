const CalendarBody = ({ data }) => {
  return (<>
    <td
      className={'calendar_cell half_1st day_'
        + (data.day ? data.day : '')
        + (data.weekend ? ' weekend_cell' : '')
        + (data.leave ? 'leave_cell leave_type_color_1' : '')}>

      {data.leave ?
          <span data-tooltip={data.leave}>{data.day}</span>
        :
        <span>{data.day}</span>
      }
    </td>
    <td
      className={'calendar_cell half_2nd day_'
        + (data.day ? data.day : '')
        + (data.weekend ? ' weekend_cell' : '')
        + (data.leave ? 'leave_cell leave_type_color_1' : '')}>
      <span></span>
    </td>
  </>

  )
}

export default CalendarBody
