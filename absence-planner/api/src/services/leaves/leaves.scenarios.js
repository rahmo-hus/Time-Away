export const standard = defineScenario({
  leave: {
    one: {
      data: {
        approver: { create: { hashedPassword: 'String', salt: 'String' } },
        leaveType: { create: { name: 'String', company: { create: {} } } },
      },
    },
    two: {
      data: {
        approver: { create: { hashedPassword: 'String', salt: 'String' } },
        leaveType: { create: { name: 'String', company: { create: {} } } },
      },
    },
  },
})
