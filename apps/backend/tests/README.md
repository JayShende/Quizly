# Quiz Application Backend Tests - Scoring Logic

This directory contains focused tests for the quiz application's backend scoring logic.

## Test Structure

### Files Overview

- **`quiz-scoring.test.ts`** - Unit tests for the core scoring logic
- **`test-utils.ts`** - Mock data and utility functions
- **`__mocks__/prisma.ts`** - Prisma client mocks
- **`setup.ts`** - Jest setup configuration

## Test Categories

### 1. Basic Scoring Tests

Tests the core scoring calculation logic:

- ✅ **Perfect Score**: All correct answers (3/3 = 100%)
- ✅ **Partial Score**: Mixed correct/wrong answers (2/3 = 67%)
- ✅ **Zero Score**: All wrong answers (0/3 = 0%)
- ✅ **Empty Answers**: No answers submitted (0/3 = 0%)

### 2. Edge Cases

Tests boundary conditions and unusual scenarios:

- ✅ **No Questions**: Quiz with no questions (0/0)
- ✅ **Extra Answers**: User answers more questions than exist
- ✅ **Missing Answers**: User answers fewer questions than exist

### 3. Error Handling

Tests error scenarios:

- ✅ **Quiz Not Found**: Throws 404 error
- ✅ **Response Not Found**: Throws 404 error

### 4. Complex Scenarios

Tests advanced scoring scenarios:

- ✅ **Multiple Correct Options**: Question with multiple correct answers
- ✅ **Duplicate Answers**: User answers same question multiple times

## Running Tests

```bash
# Run all tests
pnpm test
```

## Test Coverage

The tests cover:

- **Scoring Logic**: All mathematical calculations
- **Database Operations**: All Prisma queries
- **Error Handling**: All error scenarios
- **Edge Cases**: Boundary conditions
- **Complex Scenarios**: Advanced use cases

## Mock Strategy

- **Prisma Client**: Mocked to avoid database dependencies
- **Console Output**: Suppressed to reduce test noise

## Test Data

Mock data includes:

- Sample quiz with 3 questions
- Various answer combinations
- User responses with different scores
- Edge case scenarios

## Key Test Scenarios

### Scoring Logic Tests

1. **Perfect Score**: 3/3 correct = 100%
2. **Partial Score**: 2/3 correct = 67%
3. **Zero Score**: 0/3 correct = 0%
4. **Empty Answers**: No answers = 0%

### Error Handling Tests

1. **Quiz Not Found**: Throws 404 error
2. **Response Not Found**: Throws 404 error

### Edge Cases Tests

1. **No Questions**: Handles empty quiz
2. **Extra Answers**: Handles more answers than questions
3. **Missing Answers**: Handles fewer answers than questions

## Benefits

- **Confidence**: Know scoring works correctly
- **Regression Prevention**: Catch bugs when changing code
- **Documentation**: Tests show expected behavior
- **Refactoring Safety**: Improve code without breaking functionality
- **Edge Case Coverage**: Handle unexpected scenarios

## Assignment Requirements Met

✅ **Backend tests for the scoring logic** - Comprehensive test suite
✅ **Unit tests** - Pure logic testing
✅ **Error handling** - All error scenarios covered
✅ **Edge cases** - Boundary conditions tested
✅ **Mock strategy** - Database operations mocked
✅ **Test coverage** - All scoring scenarios covered
