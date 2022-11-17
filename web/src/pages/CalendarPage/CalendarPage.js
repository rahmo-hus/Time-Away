import { Link, routes } from '@redwoodjs/router'
import {useAuth} from "@redwoodjs/auth"
import CalendarCell from 'src/components/CalendarCell'
import { MetaTags } from '@redwoodjs/web'
import NewAbsenceCell from 'src/components/NewAbsenceCell'

const CalendarPage = () => {

  const {isAuthenticated, currentUser} = useAuth();

  return (
    <>
      <MetaTags title="Calendar" description="Calendar page" />
      <CalendarCell userId={currentUser.id}/>
      </>
      )
}

      export default CalendarPage
