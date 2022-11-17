export const standard = defineScenario({
  userAllowanceAdjustment: {
    one: {
      data: {
        user: { create: { hashedPassword: 'String', salt: 'String' } },
      },
    },
    two: {
      data: {
        user: { create: { hashedPassword: 'String', salt: 'String' } },
      },
    },
  },
})
