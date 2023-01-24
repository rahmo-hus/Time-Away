// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Private, Route, Set } from '@redwoodjs/router'

import AdminLayout from 'src/layouts/AdminLayout'
import PublicLayout from 'src/layouts/PublicLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={AdminLayout}>
        <Private roles="admin" unauthenticated="login">
          <Route path="/company-verification" page={CompanyVerificationPage} name="companyVerification" />
        </Private>
      </Set>
      <Set wrap={PublicLayout}>
        <Route path="/login" page={LoginPage} name="login" />
        <Route path="/register" page={RegisterPage} name="register" />
        <Private unauthenticated="login">
          <Private roles="employee" unauthenticated="login">
            <Route path="/notifications" page={EmployeeNotificationsPage} name="employeeNotifications" />
            <Route path="/user-requests" page={UserRequestsPage} name="userRequests" />
          </Private>
          <Private roles="manager" unauthenticated="login">
            <Route path="/request-management" page={RequestManagementPage} name="requestManagement" />
            <Route path="/new-holiday" page={NewHolidayPage} name="newHoliday" />
            <Route path="/requests" page={RequestsPage} name="requests" />
            <Route path="/settings/general" page={SettingsPage} name="settings" />
            <Route path="/settings/public-holidays" page={BankHolidaysPage} name="bankHolidays" />
            <Route path="/settings/add-department" page={AddDepartmentPage} name="addDepartment" />
            <Route path="/settings/department/edit/{id:Int!}" page={EditDepartmentPage} name="editDepartment" />
            <Route path="/settings/departments" page={DepartmentsPage} name="departments" />
            <Route path="/employee/edit/{id:Int!}" page={EditEmployeePage} name="editEmployee" />
            <Route path="/employee/add" page={AddEmployeePage} name="addEmployee" />
          </Private>
          <Route path="/team-view" page={TeamViewPage} name="teamView" />
          <Route path="/employees/all" page={ViewEmployeesPage} name="viewEmployees" />
          <Route path="/new-absence" page={NewAbsencePage} name="newAbsence" />
          <Route path="/" page={CalendarPage} name="calendar" />
        </Private>
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
