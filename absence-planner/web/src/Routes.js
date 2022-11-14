// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Private, Route, Set } from '@redwoodjs/router'
import PublicLayout from 'src/layouts/PublicLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={PublicLayout}>
        <Route path="/login" page={LoginPage} name="login" />
        <Route path="/register" page={RegisterPage} name="register" />
        <Private unauthenticated="login">
          <Route path="/department/edit/{id:Int!}" page={EditDepartmentPage} name="editDepartment" />
          <Route path="/departments" page={DepartmentsPage} name="departments" />
          <Route path="/team-view" page={TeamViewPage} name="teamView" />
          <Route path="/employee/edit/{id:Int!}" page={EditEmployeePage} name="editEmployee" />
          <Route path="/employees/all" page={ViewEmployeesPage} name="viewEmployees" />
          <Route path="/new-absence" page={NewAbsencePage} name="newAbsence" />
          <Route path="/add-employee" page={AddEmployeePage} name="addEmployee" />
          <Route path="/" page={CalendarPage} name="calendar" />
        </Private>
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
