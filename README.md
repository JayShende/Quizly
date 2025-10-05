# 🧠 Quizly - Master Your Knowledge with**Smart Quizzes**

## 🎯 **VERTO ASSOCIATE SOFTWARE ENGINEER CHALLENGE**

**Full-Stack Online Quiz Application** - A comprehensive quiz platform built as part of the Verto ASE application process, demonstrating modern web development skills, production deployment, and enterprise-level architecture.

---

A comprehensive full-stack quiz application built with modern web technologies, featuring real-time quiz taking, authentication, leaderboards, and detailed analytics.

## 🌐 Live Application

**Production URL:** [http://quizly.unseenjs.xyz/](http://quizly.unseenjs.xyz/)

## 📹 Project Walkthrough Video

**Video Recording:** [Project Explanation &amp; Walkthrough](https://drive.google.com/file/d/1mZKRCtVVTGmx2Z6qNDH1F7xdlGbJ0ZJ1/view?usp=drive_link)

This video covers the thought process, technical approach, architecture decisions, and key features implemented for the Verto ASE challenge.

The application is deployed on AWS EC2 (t2.medium instance) with:

- **Nginx** reverse proxy
- **PM2** process manager
- **NeonDB** PostgreSQL database
- **GitHub Actions** CI/CD pipeline

## 🚀 Features

### Core Features ✅

- **User Authentication** - GitHub & Google OAuth integration
- **Quiz Management** - Create, manage, and take quizzes
- **Real-time Quiz Taking** - Interactive quiz interface with navigation
- **Timer Functionality** - Configurable quiz timers with auto-submission
- **Score Calculation** - Automatic scoring with detailed results
- **Leaderboard** - Real-time ranking system
- **Response Analytics** - Detailed breakdown of user answers
- **Platform with Multiple Quiz** - The App has Multiple Quiz

### Bonus Features ✨

- **Fullscreen Mode** - Distraction-free quiz experience
- **Page Refresh Prevention** - Prevents accidental quiz interruption
- **Responsive Design** - Mobile-first, modern UI/UX
- **Real-time Progress Tracking** - Visual progress indicators
- **Detailed Results Page** - Shows correct/incorrect answers
- **Quiz Metadata Dashboard** - Overview of all available quizzes
- **Comprehensive Testing** - Backend test suite with Jest

## 🛠️ Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **NextAuth.js** - Authentication library (powered by BoltGate)
- **TanStack Query** - Data fetching (React Query)
- **shadcn/ui** - Accessible component primitives built on Radix UI
- **Lucide React** - Beautiful icons
- **Sonner** - Toast notifications
- **API Proxy** - Secure backend communication

### Backend

- **Express.js** - Node.js web framework
- **TypeScript** - Type-safe development
- **JWT** - JSON Web Token authentication
- **Zod** - Schema validation
- **CORS** - Cross-origin resource sharing
- **Jest** - Testing framework

### Database & ORM

- **PostgreSQL** - Primary database
- **Prisma** - Database ORM and migrations
- **NeonDB** - Free Postgres DB Provider

### DevOps & Deployment

- **Turbo** - Monorepo build system
- **pnpm** - Package manager
- **GitHub Actions** - CI/CD pipeline
- **AWS EC2** - Cloud hosting
- **Nginx** - Reverse proxy
- **PM2** - Process manager

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

### Custom Libraries

- **BoltGate** - Custom NextAuth.js wrapper ([npm package](https://www.npmjs.com/package/boltgate)) created and maintained by Me, providing enhanced security features and simplified authentication setup. BoltGate is a tool built to install NextAuth easily.

## 📁 Project Structure

```
quizly/
├── apps/
│   ├── frontend/                 # Next.js frontend application
│   │   ├── app/                  # App Router pages and components
│   │   │   ├── (protected)/     # Protected routes
│   │   │   │   ├── dashboard/    # User dashboard
│   │   │   │   └── quiz/        # Quiz pages
│   │   │   ├── api/             # API routes
│   │   │   ├── auth/            # Authentication pages
│   │   │   └── pages/           # Additional pages
│   │   ├── components/          # Reusable UI components
│   │   ├── lib/                 # Utility functions
│   │   └── services/            # API services and queries
│   └── backend/                 # Express.js backend API
│       ├── src/
│       │   ├── controller/       # Route controllers
│       │   ├── services/        # Business logic
│       │   ├── routes/         # API routes
│       │   ├── middlewares/    # Custom middlewares
│       │   ├── validators/     # Request validation
│       │   └── utils/         # Utility functions
│       └── tests/             # Test suites
├── packages/
│   ├── prisma/                 # Database schema and client
│   ├── ui/                    # Shared UI components
│   ├── eslint-config/         # Shared ESLint configuration
│   └── typescript-config/     # Shared TypeScript configuration
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- PostgreSQL database
- GitHub OAuth app (for authentication)
- Google OAuth app (for authentication)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd quizly
   ```
2. **Install dependencies**

   ```bash
   pnpm install
   ```
3. **Set up environment variables**

   ```bash
   Copy the Below Variables add Appropriate Values or Use the One made in Each Dir
   ```

   Fill in your environment variables in each `.env` file:

   **Frontend `.env` file (`apps/frontend/.env`):**

   ```env
   # AUTH_URL=http://localhost:3000
   AUTH_SECRET="your-nextauth-secret-key-here"

   # OAuth Providers
   GITHUB_CLIENT_ID=your-github-client-id
   GITHUB_CLIENT_SECRET=your-github-client-secret
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret

   EXPRESS_URL="http://localhost:3001"

   # JWT Secret for internal communication
   INTERNAL_JWT_SECRET="Your-jwt-here"

   ```

   **Backend `.env` file (`apps/backend/.env`):**

   ```env
   # Server Configuration
   PORT=3001

   # JWT Configuration
   JWT_SECRET="your-jwt-secret-key-here"

   ```

   **Prisma `.env` file (`packages/prisma/.env`):**

   ```env
   # Database Configuration
   DATABASE_URL="postgresql://username:password@localhost:5432/quizly_db"
   ```
4. **Set up the database**

   ```bash
   cd packages/prisma
   pnpm prisma migrate dev
   pnpm dlx prisma generate
   ```
5. **Start the development servers**

   ```bash
   # From root directory
   pnpm dev
   ```

   This will start:

   - Frontend: http://localhost:3000
   - Backend: http://localhost:3001

## 🧪 Running Tests

### Backend Tests

```bash
# Run all tests
pnpm test
```

### Test Coverage

The backend includes comprehensive test coverage with **11 test cases** covering:

#### Basic Scoring (4 tests):

- ✅ Perfect score for all correct answers
- ✅ Partial score for mixed answers
- ✅ Zero score for all wrong answers
- ✅ Zero score for empty answers

#### Edge Cases (3 tests):

- ✅ Quiz with no questions
- ✅ User answering more questions than exist
- ✅ User answering fewer questions than exist

#### Error Handling (2 tests):

- ✅ Quiz not found error
- ✅ User response not found error

#### Complex Scenarios (2 tests):

- ✅ Multiple correct options for same question
- ✅ Duplicate answers for same question

**Total Test Coverage:** 11 comprehensive test cases ensuring robust quiz scoring logic and error handling.

## 📚 API Documentation

### Authentication Endpoints

All protected endpoints require JWT authentication via the `Authorization` header.

### Quiz Endpoints

#### `POST /v1/quiz/create`

Create a new quiz

```json
{
  "title": "General Knowledge",
  "description": "Quiz on General Knowledge",
  "duration": 600
}
```

#### `GET /v1/quiz/get/:id`

Get quiz details (without correct answers)

#### `GET /v1/quiz/get-score/:quizId`

Get user's score for a specific quiz

#### `GET /v1/quiz/leaderboard/:quizId`

Get leaderboard for a specific quiz

#### `GET /v1/quiz/get-all-quiz-meta-data`

Get metadata for all quizzes

#### `GET /v1/quiz/check-if-quiz-is-submitted/:quizId`

Check if user has already submitted a quiz

### Question Endpoints

#### `POST /v1/question/add`

Add a single question to a quiz

```json
{
  "text": "What is the output of `2 + '2'` in JavaScript?",
  "quizId": "quiz_id",
  "options": [
    { "text": "4" },
    { "text": "'22'", "isCorrectAnswer": true },
    { "text": "NaN" },
    { "text": "undefined" }
  ]
}
```

#### `POST /v1/question/add-bulk`

Add multiple questions to a quiz

```json
{
  "quizId": "quiz_id",
  "questions": [
    {
      "text": "What is the national animal of India?",
      "options": [
        { "text": "Lion" },
        { "text": "Tiger", "isCorrectAnswer": true },
        { "text": "Elephant" },
        { "text": "Peacock" }
      ]
    },
    {
      "text": "Which planet is known as the Red Planet?",
      "options": [
        { "text": "Mars", "isCorrectAnswer": true },
        { "text": "Jupiter" },
        { "text": "Saturn" },
        { "text": "Venus" }
      ]
    }
  ]
}
```

### Response Endpoints

#### `POST /v1/response/add`

Submit quiz responses

```json
{
  "quizId": "quiz-id",
  "answers": [
    {
      "questionId": "question-id",
      "optionId": "option-id"
    }
  ]
}
```

#### `GET /v1/response/:quizId`

Get user's detailed response for a quiz

## 🎯 Key Features Explained

### Quiz Timer System

- Configurable duration per quiz
- Real-time countdown display
- Auto-submission when time expires
- Visual timer warnings

### Authentication Flow

- OAuth integration with GitHub and Google
- JWT-based session management
- Protected routes with middleware
- User profile management
- **BoltGate Integration** - Custom NextAuth.js wrapper for enhanced security

### Quiz Taking Experience

- Fullscreen mode for distraction-free experience
- Page refresh prevention during quiz
- Real-time answer tracking
- Progress indicators
- Navigation between questions

### Scoring System

- Automatic score calculation
- Detailed answer analysis
- Leaderboard generation

### Security Architecture

- **API Proxy Layer** - Next.js API routes act as a secure proxy between frontend and backend
- **CORS Protection** - Configured CORS policies prevent unauthorized access
- **JWT Token Management** - Secure token handling with automatic refresh
- **Environment Isolation** - Sensitive data protected through environment variables
- **BoltGate Security** - Custom authentication wrapper providing additional security layers

### API Access Requirements

**Important:** The backend API cannot be accessed directly. All requests must go through the Next.js proxy:

- ❌ **Direct access won't work:** `http://localhost:3001/api/v1/question/add`
- ✅ **Correct proxy path:** `http://localhost:3000/api/proxy/v1/question/add`

**Authentication Requirements:**

- All API requests require NextAuth-generated cookies for authentication
- Direct API testing (Postman, etc.) requires proper session cookies
- **Alternative:** Use the live application at [http://quizly.unseenjs.xyz/](http://quizly.unseenjs.xyz/)

## 🚀 Deployment

### Production Setup

The application is deployed using:

1. **AWS EC2** - t2.medium instance
2. **Nginx** - Reverse proxy configuration with SSL certificates
3. **Certbot** - SSL certificate management for HTTPS
4. **PM2** - Process management
5. **NeonDB** - Cloud PostgreSQL database
6. **GitHub Actions** - Automated deployment

### CI/CD Pipeline

- Automatic deployment on push to production branch
- Uses Github Action For CICD Deployment

## 🔧 Development

### Available Scripts

```bash
# Development
pnpm dev              # Start all services in development mode
pnpm build            # Build all packages
pnpm start            # Start production servers

# Testing
pnpm test             # Run backend tests

```

### Database Management

```bash
# Generate Prisma client
pnpm dlx prisma generate

# Create migration
pnpm prisma migrate dev

# Reset database
pnpm prisma migrate reset
```

## 🏗️ Architecture Decisions

### Monorepo Structure

- **Turbo** for efficient builds and caching
- **Shared packages** for common configurations
- **Workspace dependencies** for internal packages (workspace:\*)

### Database Design

- **Normalized schema** with proper relationships
- **Cascade deletes** for data integrity
- **Indexes** for performance optimization
- **JSON fields** for flexible data storage

### Frontend Architecture

- **App Router** for modern Next.js patterns
- **Custom hooks** for reusable logic
- **Component composition** for maintainability
- **TypeScript** for type safety

### Backend Architecture

- **MVC pattern** with clear separation
- **Middleware** for cross-cutting concerns
- **Validation** with Zod schemas
- **Error handling** with custom error classes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Jay Shende** - [unseenjs.xyz](https://unseenjs.xyz)

Built with ❤️ for the Verto Associate Software Engineer position.

---

## 🎯 Project Goals Achieved

- ✅ **Full-stack functionality** - Complete end-to-end quiz application
- ✅ **Database integration** - PostgreSQL with Prisma ORM
- ✅ **User authentication** - OAuth with GitHub and Google
- ✅ **Quiz management** - Create, take, and score quizzes
- ✅ **Real-time features** - Timer, progress tracking, leaderboards
- ✅ **Production deployment** - AWS EC2 with CI/CD pipeline
- ✅ **Comprehensive testing** - Backend test suite with Jest
- ✅ **Modern UI/UX** - Responsive design with Tailwind CSS
- ✅ **Type safety** - Full TypeScript implementation

This project demonstrates proficiency in modern web development, full-stack architecture, cloud deployment, and production-ready application development.
