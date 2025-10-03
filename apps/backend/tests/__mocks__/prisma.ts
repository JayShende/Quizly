// Mock Prisma client for testing
export const client = {
  quiz: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
  },
  response: {
    findFirst: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
  question: {
    findMany: jest.fn(),
  },
  option: {
    findMany: jest.fn(),
  },
  answer: {
    create: jest.fn(),
    findMany: jest.fn(),
  },
} as any;
