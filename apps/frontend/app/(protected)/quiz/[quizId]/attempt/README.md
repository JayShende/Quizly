# Quiz Attempt Page - Refactored Structure

This directory contains the refactored quiz attempt page, broken down into smaller, more manageable components and custom hooks.

## File Structure

```
attempt/
├── components/
│   ├── index.ts                 # Component exports
│   ├── PreQuizForm.tsx         # Pre-quiz instructions and start form
│   ├── QuizInterface.tsx       # Main quiz interface wrapper
│   ├── QuizCompleted.tsx       # Quiz completion screen
│   ├── QuestionCard.tsx        # Individual question display
│   ├── QuizHeader.tsx          # Quiz header with timer and progress
│   └── QuizFooter.tsx          # Navigation and submit buttons
├── hooks/
│   ├── index.ts                # Hook exports
│   ├── useQuizTimer.ts         # Timer management
│   ├── useQuizAnswers.ts       # Answer state management
│   ├── useQuizNavigation.ts    # Question navigation
│   ├── useQuizPrevention.ts    # Page refresh prevention
│   └── useFullscreen.ts        # Fullscreen management
├── types.ts                    # TypeScript interfaces
├── page.tsx                    # Main page component
└── README.md                   # This file
```

## Components

### PreQuizForm

- Displays quiz instructions and details
- Shows important notes and rules
- Handles quiz start action

### QuizInterface

- Main wrapper for the quiz experience
- Combines header, question, and footer
- Manages quiz state and interactions

### QuizCompleted

- Displays completion message
- Shows quiz summary statistics
- Handles post-quiz actions

### QuestionCard

- Renders individual questions
- Handles answer selection
- Shows question options with proper styling

### QuizHeader

- Displays current question number
- Shows countdown timer
- Renders progress bar

### QuizFooter

- Navigation buttons (Previous/Next)
- Submit button for final question
- Handles quiz submission

## Custom Hooks

### useQuizTimer

- Manages countdown timer
- Handles auto-submission on timeout
- Provides timer reset functionality

### useQuizAnswers

- Manages answer state
- Handles answer selection and updates
- Provides answer validation utilities

### useQuizNavigation

- Manages current question index
- Handles question navigation
- Provides navigation utilities

### useQuizPrevention

- Prevents page refresh during quiz
- Blocks keyboard shortcuts
- Shows warning dialogs

### useFullscreen

- Manages fullscreen mode
- Handles enter/exit fullscreen
- Provides fullscreen utilities

## Benefits of Refactoring

1. **Separation of Concerns**: Each component has a single responsibility
2. **Reusability**: Components can be easily reused or modified
3. **Maintainability**: Easier to debug and update individual pieces
4. **Testability**: Each component and hook can be tested independently
5. **Readability**: Code is more organized and easier to understand
6. **Performance**: Better optimization opportunities with smaller components

## Usage

The main `page.tsx` file orchestrates all the components and hooks to provide a complete quiz experience. The structure allows for easy customization and extension of individual features without affecting the entire codebase.
