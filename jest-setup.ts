jest.mock('bcrypt');
jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => {
      return {
        authToken: {
          findMany: jest.fn().mockResolvedValue([]),
          findFirst: jest.fn().mockResolvedValue({}),
          findUnique: jest.fn().mockResolvedValue({}),
          update: jest.fn().mockResolvedValue({}),
          updateMany: jest.fn().mockResolvedValue([]),
          create: jest.fn().mockResolvedValue({}),
          createMany: jest.fn().mockResolvedValue([]),
          delete: jest.fn().mockResolvedValue({}),
        },
        user: {
          findMany: jest.fn().mockResolvedValue([]),
          findFirst: jest.fn().mockResolvedValue({}),
          findUnique: jest.fn().mockResolvedValue({}),
          update: jest.fn().mockResolvedValue({}),
          updateMany: jest.fn().mockResolvedValue({}),
          create: jest.fn().mockResolvedValue({}),
          createMany: jest.fn().mockResolvedValue({}),
          delete: jest.fn().mockResolvedValue({}),
        },
      };
    }),
  };
});
