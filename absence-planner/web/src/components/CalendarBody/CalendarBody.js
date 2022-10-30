const CalendarBody = ({ data }) => {
  return (<>
    <td
      className={'calendar_cell half_1st day_' + (data.day ? data.day : '') + (data.weekend ? ' weekend_cell' : '')}>
      <span>{data.day}</span>
    </td>
    <td
      className={'calendar_cell half_2nd day_' + (data.day ? data.day : '') + (data.weekend ? ' weekend_cell' : '')}>
      <span></span>
    </td>
  </>

  )
}

export default CalendarBody
