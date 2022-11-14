export const standard = defineScenario({
  departmentSupervisor: {
    one: {
      data: {
        user: { create: { hashedPassword: 'String', salt: 'String' } },
        department: { create: {} },
      },
    },
    two: {
      data: {
        user: { create: { hashedPassword: 'String', salt: 'String' } },
        department: { create: {} },
      },
    },
  },
})
