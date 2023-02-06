import { db } from 'src/lib/db'
import { sendEmail } from 'src/lib/email'

export const users = () => {
  return db.user.findMany()
}

export const user = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const usersByCompanyId = ({ companyId }) => {
  return db.user.findMany({
    where: {
      companyId: companyId,
    },
  })
}

export const createUser = ({ input }) => {
  return db.user.create({
    data: input,
  })
}

export const updateUser = ({ id, input }) => {
  return db.user.update({
    data: input,
    where: { id },
  })
}

export const deleteUser = ({ id }) => {
  return db.user.delete({
    where: { id },
  })
}

export const emailUser = async ({ id, input }) => {
  const user = await db.user.findUnique({
    where: { id },
  })

  await sendTestEmail(input)

  return user
}

function sendTestEmail(input) {
  const subject = 'Company verification'
  const text = ''
  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
    <title>Company Information</title>
  </head>
  <body>
    <div class="container">
      <h1 class="text-center my-5">Company Information</h1>
      <p class="text-center ">The following information is subject to verification. Please click the button below to open page for company verification.</p>
     <table class="table table-bordered">
    <tr>
      <th>Company Name</th>
      <td>${input.name}</td>
    </tr>
    <tr>
      <th>Manager Name</th>
      <td>${input.firstName} ${input.lastName}</td>
    </tr>
    <tr>
      <th>Manager Email</th>
      <td>${input.email}</td>
    </tr>
    <tr>
      <th>Country</th>
      <td>Bosnia and Herzegovina</td>
    </tr>
  </table>
  <div class="text-center my-3">
    <a href="http://localhost:8910/login" _target="blank" class="btn btn-success">Verify</a>
  </div>
    </div>
  </body>
  </html>
  `

  return sendEmail({ to: 'huseinagicrahmo@gmail.com', subject, text, html })
}

export const User = {
  company: async (_obj, { root }) => {
    const company = await db.user
      .findUnique({ where: { id: root?.id } })
      .company()
    company.departments = await db.department.findMany({
      where: { companyId: company.id },
    })
    company.schedule = await db.schedule.findUnique({
      where: { companyId: company.id },
    })

    return company
  },
  approvedLeaves: (_obj, { root }) => {
    return db.leave.findMany({ where: { status: 2, requesterId: root?.id } })
  },
  requestedLeaves: async (_obj, { root }) => {
    const forApproval = await db.leave.findMany({
      where: {
        approverId: root?.id,
        status: 1,
      },
    })

    const forRevoke = await db.leave.findMany({
      where: {
        approverId: root?.id,
        status: 4,
      },
    })

    return forApproval.concat(forRevoke)
  },
  allLeaves: (_obj, { root }) => {
    return db.leave.findMany({ where: { requesterId: root?.id } })
  },
  schedule: (_obj, { root }) => {
    return db.schedule.findUnique({ where: { userId: root?.id } })
  },
  department: (_obj, { root }) => {
    return db.department.findFirst({
      where: { id: root?.departmentId },
    })
  },
  allowanceAdjustment: (_obj, { root }) => {
    return db.userAllowanceAdjustment.findUnique({
      where: { userId: root?.id },
    })
  },
  notifications: (_obj, { root }) => {
    return db.notification.findMany({
      where: { userId: root?.id },
    })
  },
}
