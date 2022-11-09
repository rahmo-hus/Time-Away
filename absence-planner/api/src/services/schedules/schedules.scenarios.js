export const standard = defineScenario({
  schedule: {
    one: {
      data: {
        company: { create: {} },
        user: { create: { hashedPassword: 'String', salt: 'String' } },
      },
    },
    two: {
      data: {
        company: { create: {} },
        user: { create: { hashedPassword: 'String', salt: 'String' } },
      },
    },
  },
})
