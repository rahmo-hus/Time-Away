export const standard = defineScenario({
  notification: {
    one: {
      data: {
        text: 'String',
        seen: true,
        user: {
          create: {
            email: 'String5353891',
            firstName: 'String',
            lastName: 'String',
            hashedPassword: 'String',
            salt: 'String',
            company: { create: {} },
          },
        },
      },
    },
    two: {
      data: {
        text: 'String',
        seen: true,
        user: {
          create: {
            email: 'String932636',
            firstName: 'String',
            lastName: 'String',
            hashedPassword: 'String',
            salt: 'String',
            company: { create: {} },
          },
        },
      },
    },
  },
})
