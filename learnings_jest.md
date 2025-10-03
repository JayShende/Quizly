# Jest Testing Framework - Complete Learning Guide

## Table of Contents

1. [What is Jest?](#what-is-jest)
2. [Jest Basics](#jest-basics)
3. [Setting Up Jest](#setting-up-jest)
4. [Writing Your First Test](#writing-your-first-test)
5. [Jest Matchers](#jest-matchers)
6. [Mocking in Jest](#mocking-in-jest)
7. [Test Structure and Organization](#test-structure-and-organization)
8. [Our Quiz Scoring Tests - Line by Line](#our-quiz-scoring-tests---line-by-line)
9. [Best Practices](#best-practices)
10. [Common Patterns](#common-patterns)

---

## What is Jest?

**Jest** is a JavaScript testing framework developed by Facebook. It's designed to work out of the box with minimal configuration and provides:

- **Test Runner**: Executes your tests
- **Assertion Library**: Provides functions to test values
- **Mocking**: Creates fake versions of functions/modules
- **Code Coverage**: Shows which parts of your code are tested
- **Snapshot Testing**: Compares component output to saved snapshots

### Why Use Jest?

- ✅ **Zero Configuration**: Works immediately
- ✅ **Fast**: Runs tests in parallel
- ✅ **Built-in Mocking**: No need for external libraries
- ✅ **Great Error Messages**: Clear feedback when tests fail
- ✅ **Code Coverage**: Built-in coverage reports
- ✅ **Watch Mode**: Automatically re-runs tests when files change

---

## Jest Basics

### 1. Test Structure

Every Jest test follows this pattern:

```javascript
describe("Test Suite Name", () => {
  test("test description", () => {
    // Test code here
  });
});
```

### 2. Key Concepts

**`describe()`**: Groups related tests together

```javascript
describe("Calculator", () => {
  // All calculator tests go here
});
```

**`test()` or `it()`**: Individual test cases

```javascript
test("should add two numbers", () => {
  expect(2 + 2).toBe(4);
});

// 'it' is an alias for 'test'
it("should multiply two numbers", () => {
  expect(3 * 4).toBe(12);
});
```

**`expect()`**: Makes assertions about values

```javascript
expect(actualValue).toBe(expectedValue);
```

---

## Setting Up Jest

### 1. Installation

```bash
npm install --save-dev jest @types/jest ts-jest
```

### 2. Configuration (jest.config.js)

```javascript
module.exports = {
  preset: "ts-jest", // Use TypeScript preset
  testEnvironment: "node", // Node.js environment
  roots: ["<rootDir>/src", "<rootDir>/tests"],
  testMatch: ["**/*.test.ts"], // Find test files
  transform: {
    "^.+\\.ts$": "ts-jest", // Transform TypeScript files
  },
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
};
```

### 3. Package.json Scripts

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

---

## Writing Your First Test

### Basic Test Example

```javascript
// math.test.js
function add(a, b) {
  return a + b;
}

describe("Math Functions", () => {
  test("add should return sum of two numbers", () => {
    // Arrange
    const a = 2;
    const b = 3;

    // Act
    const result = add(a, b);

    // Assert
    expect(result).toBe(5);
  });
});
```

### Running Tests

```bash
npm test
# Output:
# ✓ add should return sum of two numbers (2ms)
# Test Suites: 1 passed, 1 total
# Tests: 1 passed, 1 total
```

---

## Jest Matchers

Matchers let you test values in different ways:

### Equality Matchers

```javascript
expect(2 + 2).toBe(4); // Exact equality
expect({ name: "John" }).toEqual({ name: "John" }); // Deep equality
expect("hello").toStrictEqual("hello"); // Strict equality
```

### Truthiness Matchers

```javascript
expect(true).toBeTruthy();
expect(false).toBeFalsy();
expect(null).toBeNull();
expect(undefined).toBeUndefined();
expect(0).toBeFalsy();
```

### Number Matchers

```javascript
expect(2.5).toBeGreaterThan(2);
expect(2.5).toBeGreaterThanOrEqual(2.5);
expect(2.5).toBeLessThan(3);
expect(2.5).toBeCloseTo(2.5, 1);
```

### String Matchers

```javascript
expect("hello world").toMatch(/hello/);
expect("hello world").toContain("world");
expect("HELLO").toMatch(/hello/i); // Case insensitive
```

### Array Matchers

```javascript
expect(["apple", "banana"]).toContain("apple");
expect(["apple", "banana"]).toHaveLength(2);
expect(["apple", "banana"]).toEqual(expect.arrayContaining(["apple"]));
```

### Object Matchers

```javascript
expect({ name: "John", age: 30 }).toHaveProperty("name");
expect({ name: "John", age: 30 }).toHaveProperty("age", 30);
expect({ name: "John" }).toEqual(expect.objectContaining({ name: "John" }));
```

### Error Matchers

```javascript
expect(() => {
  throw new Error("Something went wrong");
}).toThrow("Something went wrong");

expect(() => {
  throw new Error("Something went wrong");
}).toThrowError();
```

---

## Mocking in Jest

Mocking replaces real functions with fake ones for testing.

### 1. Function Mocking

```javascript
// Mock a function
const mockFunction = jest.fn();

// Set return value
mockFunction.mockReturnValue("mocked value");

// Set implementation
mockFunction.mockImplementation((x) => x * 2);

// Check if called
expect(mockFunction).toHaveBeenCalled();
expect(mockFunction).toHaveBeenCalledWith("argument");
expect(mockFunction).toHaveBeenCalledTimes(2);
```

### 2. Module Mocking

```javascript
// Mock an entire module
jest.mock("./database", () => ({
  getUser: jest.fn(),
  saveUser: jest.fn(),
}));

// Mock with implementation
jest.mock("./api", () => ({
  fetchData: jest.fn().mockResolvedValue({ data: "mocked" }),
}));
```

### 3. Mock Reset

```javascript
beforeEach(() => {
  jest.clearAllMocks(); // Reset all mocks
});

// Or reset specific mock
mockFunction.mockReset();
```

---

## Test Structure and Organization

### 1. AAA Pattern

Every test should follow Arrange-Act-Assert:

```javascript
test("should calculate total price", () => {
  // Arrange - Set up test data
  const items = [
    { name: "apple", price: 1.5 },
    { name: "banana", price: 0.75 },
  ];

  // Act - Execute the function
  const total = calculateTotal(items);

  // Assert - Check the result
  expect(total).toBe(2.25);
});
```

### 2. Setup and Teardown

```javascript
describe("Database Tests", () => {
  beforeAll(() => {
    // Run once before all tests
    setupDatabase();
  });

  afterAll(() => {
    // Run once after all tests
    cleanupDatabase();
  });

  beforeEach(() => {
    // Run before each test
    clearDatabase();
  });

  afterEach(() => {
    // Run after each test
    resetMocks();
  });
});
```

### 3. Nested Describes

```javascript
describe("User Service", () => {
  describe("createUser", () => {
    test("should create user with valid data", () => {
      // Test implementation
    });

    test("should throw error with invalid data", () => {
      // Test implementation
    });
  });

  describe("getUser", () => {
    test("should return user by id", () => {
      // Test implementation
    });
  });
});
```

---

## Our Quiz Scoring Tests - Line by Line

Now let's break down our actual test file line by line:

### File Structure Overview

```typescript
// quiz-scoring.test.ts
import { client } from "@repo/prisma/client";
import quizService from "../src/services/quiz.service";
import ApiError from "../src/utils/api-error";
import httpStatus from "http-status";
import {
  mockQuizWithCorrectOptions,
  mockUserResponse,
  resetMocks,
  createMockQuizWithCorrectOptions,
  createMockUserResponse,
} from "./test-utils";
```

**Line-by-Line Explanation:**

**Lines 1-5: Imports**

```typescript
import { client } from "@repo/prisma/client"; // Database client
import quizService from "../src/services/quiz.service"; // Service we're testing
import ApiError from "../src/utils/api-error"; // Custom error class
import httpStatus from "http-status"; // HTTP status codes
```

- We import the actual service we want to test (`quizService`)
- We import the database client to mock it
- We import error classes and HTTP status codes for error testing

**Lines 6-12: Test Utilities Import**

```typescript
import {
  mockQuizWithCorrectOptions, // Pre-made mock quiz data
  mockUserResponse, // Pre-made mock user response
  resetMocks, // Function to reset all mocks
  createMockQuizWithCorrectOptions, // Function to create custom quiz data
  createMockUserResponse, // Function to create custom user response
} from "./test-utils";
```

- These are helper functions we created to make testing easier
- Instead of writing the same mock data in every test, we reuse these functions

**Lines 14-24: Module Mocking**

```typescript
jest.mock("@repo/prisma/client", () => ({
  client: {
    quiz: {
      findUnique: jest.fn(), // Mock the quiz.findUnique method
    },
    response: {
      findFirst: jest.fn(), // Mock the response.findFirst method
    },
  },
}));
```

- This tells Jest: "When you see `@repo/prisma/client`, replace it with our fake version"
- We only mock the methods we actually use in our tests
- `jest.fn()` creates a mock function that we can control

**Lines 26-29: Test Suite Setup**

```typescript
describe("Quiz Scoring Logic", () => {
  beforeEach(() => {
    resetMocks();
  });
```

- `describe()` groups all our tests under "Quiz Scoring Logic"
- `beforeEach()` runs before each individual test
- `resetMocks()` clears all mock function calls and return values

### Individual Test Breakdown

Let's look at the first test in detail:

**Lines 32-72: Perfect Score Test**

```typescript
test("should return perfect score for all correct answers", async () => {
  // Arrange
  const quizId = "quiz-1";
  const userId = "user-1";

  const mockQuiz = createMockQuizWithCorrectOptions();
  const mockResponse = createMockUserResponse({
    answers: [
      {
        id: "answer-1",
        questionId: "q1",
        optionId: "opt2", // Correct
        option: { id: "opt2", text: "4", isCorrectAnswer: true },
      },
      {
        id: "answer-2",
        questionId: "q2",
        optionId: "opt5", // Correct
        option: { id: "opt5", text: "Paris", isCorrectAnswer: true },
      },
      {
        id: "answer-3",
        questionId: "q3",
        optionId: "opt8", // Correct
        option: { id: "opt8", text: "Blue", isCorrectAnswer: true },
      },
    ],
  });

  (client.quiz.findUnique as jest.Mock).mockResolvedValue(mockQuiz);
  (client.response.findFirst as jest.Mock).mockResolvedValue(mockResponse);

  // Act
  const result = await quizService.calculateScore(quizId, userId);

  // Assert
  expect(result).toEqual({
    correctAnswers: 3,
    totalQuestions: 3,
  });
});
```

**Line-by-Line Breakdown:**

**Lines 33-35: Test Setup (Arrange)**

```typescript
const quizId = "quiz-1";
const userId = "user-1";
```

- We define the input parameters for our test
- These are the IDs we'll pass to the `calculateScore` function

**Lines 37-58: Mock Data Creation (Arrange)**

```typescript
const mockQuiz = createMockQuizWithCorrectOptions();
const mockResponse = createMockUserResponse({
  answers: [
    // ... answer data
  ],
});
```

- `createMockQuizWithCorrectOptions()` creates a fake quiz with correct answer options
- `createMockUserResponse()` creates a fake user response with their answers
- We're simulating a user who answered all 3 questions correctly

**Lines 60-61: Mock Configuration (Arrange)**

```typescript
(client.quiz.findUnique as jest.Mock).mockResolvedValue(mockQuiz);
(client.response.findFirst as jest.Mock).mockResolvedValue(mockResponse);
```

- We tell our mock functions what to return when called
- `mockResolvedValue()` is used for async functions that return promises
- When `quizService.calculateScore()` calls the database, it will get our fake data instead

**Lines 63-64: Function Execution (Act)**

```typescript
const result = await quizService.calculateScore(quizId, userId);
```

- We call the actual function we're testing
- `await` is used because the function is asynchronous
- We store the result in a variable

**Lines 66-70: Result Verification (Assert)**

```typescript
expect(result).toEqual({
  correctAnswers: 3,
  totalQuestions: 3,
});
```

- We check if the result matches what we expect
- `toEqual()` does deep equality comparison
- Since all 3 answers were correct, we expect 3 correct out of 3 total

### Error Handling Test

**Lines 285-297: Quiz Not Found Error Test**

```typescript
test("should throw error when quiz not found", async () => {
  // Arrange
  const quizId = "non-existent-quiz";
  const userId = "user-1";

  (client.quiz.findUnique as jest.Mock).mockResolvedValue(null);

  // Act & Assert
  await expect(quizService.calculateScore(quizId, userId)).rejects.toThrow(
    new ApiError(httpStatus.NOT_FOUND, "Quiz not found")
  );
});
```

**Line-by-Line Breakdown:**

**Lines 287-288: Setup**

```typescript
const quizId = "non-existent-quiz";
const userId = "user-1";
```

- We use a quiz ID that doesn't exist

**Line 290: Mock Configuration**

```typescript
(client.quiz.findUnique as jest.Mock).mockResolvedValue(null);
```

- We make the database return `null` (quiz not found)

**Lines 292-296: Error Testing**

```typescript
await expect(quizService.calculateScore(quizId, userId)).rejects.toThrow(
  new ApiError(httpStatus.NOT_FOUND, "Quiz not found")
);
```

- `expect().rejects.toThrow()` tests that the function throws an error
- We check that it throws the specific error we expect
- `await` is needed because we're testing an async function

### Edge Case Test

**Lines 182-206: No Questions Test**

```typescript
test("should handle quiz with no questions", async () => {
  // Arrange
  const quizId = "quiz-1";
  const userId = "user-1";

  const mockQuiz = createMockQuizWithCorrectOptions({
    questions: [], // No questions
  });
  const mockResponse = createMockUserResponse({
    answers: [],
  });

  (client.quiz.findUnique as jest.Mock).mockResolvedValue(mockQuiz);
  (client.response.findFirst as jest.Mock).mockResolvedValue(mockResponse);

  // Act
  const result = await quizService.calculateScore(quizId, userId);

  // Assert
  expect(result).toEqual({
    correctAnswers: 0,
    totalQuestions: 0,
  });
});
```

**Key Points:**

- We test what happens when a quiz has no questions
- We expect 0 correct out of 0 total questions
- This tests the boundary condition of our scoring logic

---

## Best Practices

### 1. Test Naming

```javascript
// Good: Descriptive and clear
test("should return error when user provides invalid email", () => {});

// Bad: Vague and unclear
test("email test", () => {});
```

### 2. One Concept Per Test

```javascript
// Good: Each test has one clear purpose
test("should add two positive numbers", () => {
  expect(add(2, 3)).toBe(5);
});

test("should handle negative numbers", () => {
  expect(add(-2, 3)).toBe(1);
});

// Bad: Testing multiple concepts in one test
test("should add numbers and handle negatives", () => {
  expect(add(2, 3)).toBe(5);
  expect(add(-2, 3)).toBe(1);
});
```

### 3. Arrange-Act-Assert Pattern

```javascript
test("should calculate total with tax", () => {
  // Arrange - Set up test data
  const items = [{ price: 10 }, { price: 20 }];
  const taxRate = 0.1;

  // Act - Execute the function
  const total = calculateTotalWithTax(items, taxRate);

  // Assert - Check the result
  expect(total).toBe(33);
});
```

### 4. Use Descriptive Test Data

```javascript
// Good: Clear what the data represents
const validUser = {
  name: "John Doe",
  email: "john@example.com",
  age: 25,
};

// Bad: Unclear what the data represents
const user = {
  name: "a",
  email: "b@c.com",
  age: 1,
};
```

### 5. Test Edge Cases

```javascript
// Test normal cases
test("should work with normal input", () => {});

// Test edge cases
test("should handle empty input", () => {});
test("should handle null input", () => {});
test("should handle very large numbers", () => {});
test("should handle special characters", () => {});
```

---

## Common Patterns

### 1. Testing Async Functions

```javascript
test("should fetch user data", async () => {
  const mockData = { id: 1, name: "John" };
  fetchUser.mockResolvedValue(mockData);

  const result = await getUser(1);

  expect(result).toEqual(mockData);
});
```

### 2. Testing Error Cases

```javascript
test("should throw error for invalid input", () => {
  expect(() => {
    validateInput(null);
  }).toThrow("Input cannot be null");
});
```

### 3. Testing Function Calls

```javascript
test("should call database with correct parameters", () => {
  const mockSave = jest.fn();

  saveUser({ name: "John" }, mockSave);

  expect(mockSave).toHaveBeenCalledWith({ name: "John" });
  expect(mockSave).toHaveBeenCalledTimes(1);
});
```

### 4. Testing Side Effects

```javascript
test("should update user count", () => {
  let userCount = 0;

  addUser(() => userCount++);

  expect(userCount).toBe(1);
});
```

---

## Running Tests

### Basic Commands

```bash
# Run all tests
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run specific test file
npm test quiz-scoring.test.ts

# Run tests matching a pattern
npm test -- --testNamePattern="perfect score"
```

### Test Output Example

```
PASS tests/quiz-scoring.test.ts
  Quiz Scoring Logic
    calculateScore - Basic Scoring
      ✓ should return perfect score for all correct answers (7ms)
      ✓ should return partial score for mixed answers (1ms)
      ✓ should return zero score for all wrong answers (1ms)
      ✓ should return zero score for empty answers (1ms)
    calculateScore - Edge Cases
      ✓ should handle quiz with no questions (2ms)
      ✓ should handle user answering more questions than exist (1ms)
      ✓ should handle user answering fewer questions than exist (1ms)
    calculateScore - Error Handling
      ✓ should throw error when quiz not found (30ms)
      ✓ should throw error when user response not found (2ms)
    calculateScore - Complex Scenarios
      ✓ should handle multiple correct options for same question (1ms)
      ✓ should handle duplicate answers for same question (1ms)

Test Suites: 1 passed, 1 total
Tests:       11 passed, 11 total
Snapshots:   0 total
Time:        1.963 s
```

---

## Summary

Jest is a powerful testing framework that makes it easy to write, run, and maintain tests. Key takeaways:

1. **Start Simple**: Begin with basic tests and gradually add complexity
2. **Follow AAA Pattern**: Arrange, Act, Assert for every test
3. **Use Descriptive Names**: Make it clear what each test does
4. **Test Edge Cases**: Don't just test the happy path
5. **Mock External Dependencies**: Keep tests isolated and fast
6. **One Concept Per Test**: Each test should verify one specific behavior
7. **Use Setup/Teardown**: Keep tests clean and independent

With this knowledge, you can write comprehensive tests for any JavaScript/TypeScript application, ensuring your code works correctly and remains maintainable as it grows.

---

## Quick Reference

### Common Jest Matchers

```javascript
expect(value).toBe(expected); // Exact equality
expect(value).toEqual(expected); // Deep equality
expect(value).toBeTruthy(); // Truthy value
expect(value).toBeFalsy(); // Falsy value
expect(value).toContain(item); // Array/string contains
expect(value).toHaveLength(number); // Array/string length
expect(value).toThrow(); // Function throws error
expect(value).toHaveBeenCalled(); // Mock was called
expect(value).toHaveBeenCalledWith(); // Mock called with args
```

### Common Jest Functions

```javascript
describe("Test Suite", () => {}); // Group tests
test("test name", () => {}); // Individual test
beforeEach(() => {}); // Run before each test
afterEach(() => {}); // Run after each test
beforeAll(() => {}); // Run once before all tests
afterAll(() => {}); // Run once after all tests
jest.fn(); // Create mock function
jest.mock(); // Mock a module
```

This guide should give you everything you need to understand and write Jest tests like a pro! 🚀
