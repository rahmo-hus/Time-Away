const CalendarBody = ({ data }) => {
  return (
    <>
      <td
        className={
          'calendar_cell half_1st day_' +
          (data.day ? data.day : '') +
          (data.weekend ? ' weekend_cell' : '') +
          (data.leave?.status === 2 && !data.weekend
            ? ' leave_cell leave_type_color_1'
            : '') +
          (data.leave?.status === 1 && !data.weekend
            ? ' leave_cell_pended'
            : '')
        }
      >
        {data.leave ? (
          <span
            data-tooltip={
              (data.leave?.status === 1
                ? 'Pending approval: '
                : 'Approved absence: ') + data.leave?.leaveType?.name
            }
          >
            {data.day}
          </span>
        ) : (
          <span>{data.day}</span>
        )}
      </td>
      <td
        className={
          'calendar_cell half_2nd day_' +
          (data.day ? data.day : '') +
          (data.weekend ? ' weekend_cell' : '') +
          (data.leave?.status === 2 && !data.weekend
            ? ' leave_cell leave_type_color_1'
            : '') +
          (data.leave?.status === 1 && !data.weekend
            ? ' leave_cell_pended'
            : '')
        }
      >
        <span></span>
      </td>
    </>
  )
}

export default CalendarBody