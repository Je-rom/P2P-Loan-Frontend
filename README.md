# P2P Loan Application

This is a decentralized platform for peer-to-peer loans. The application consists of a **frontend** built with React.js and a **backend** developed using Node.js and Express.js. The frontend provides the user interface for borrowers and lenders, while the backend handles authentication, business logic, and database operations.

**Live Application**: https://borrowhub.vercel.app/

## Repositories

- **Frontend Repository**: [P2P Loan Frontend](https://github.com/Je-rom/P2P-Loan-Frontend)
- **Backend Repository**: [P2P Loan Backend](https://github.com/okikiolanlesi/p2p-loan-backend)

## Table of Contents

1. [Frontend Repository](#frontend-repository)
    - Technology Stack
    - Setup Instructions
    - Key Files and Folders
    - Deployment Process
2. [Backend Repository](#backend-repository)
    - Technology Stack
    - Setup Instructions
    - Key Files and Folders
    - Deployment Process
3. [API Endpoints](#api-endpoints)
4. [Troubleshooting](#troubleshooting)

---

## Frontend Repository

**Repository Link**: [P2P Loan Frontend](https://github.com/Je-rom/P2P-Loan-Frontend)

### Technology Stack
- **NextJS**: For Building the User Interface
- **React Hook Form**: For form structure and handling
- **Zustand**: For for state management in React.
- **Tanstack Query**: For asynchronous state management
- **Shadcn**: Open-source customizable components
- **Zod**: TypeScript-first schema declaration and validation library
- **Magic UI**: For Open-source animated components
- **Aceternity**: For Tailwind CSS and Framer Motion Components
- **Axios**: For making API requests.
- **TailwindCSS**: For styling.
- **React Router**: For navigation.

### Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/Je-rom/P2P-Loan-Frontend.git
   cd p2p-loan-Frontend
2. Install dependencies:
    ```bash
    npm install
3. Set up a environment
    Create a .env file in the root directory and add:
    ```bash
    NEXT_APP_BACKEND_URL=<backend_api_url>
4. Run the Application
    ```bash
    npm run dev

The application will run on http://localhost:3000.

### Key Files and Folders

- **`src/`**: Contains React components and logic.
  - **`components/`**: Reusable components like forms and layout elements.
  - **`app/`**: Specific pages (e.g., dashboard, login, register).
  - **`services/`**: API request functions.
  - **`App.js`**: Main entry point, handles routing.

### Deployment Process

1. **Build the production version**:
   ```bash
   npm run build
2. Deploy the **build/** folder to a static file server (eg.  Netlify or Vercel).


## Backend Repository
**Repository Link**: [P2P Loan Backend](https://github.com/okikiolanlesi/p2p-loan-backend)

### Technology Stack
- C#: Backend runtime.
- Asp.NET: Web framework.
- SQL Server: NoSQL database.
- Entity Framework Core: object-relational mapper (ORM)
- Azure Open AI: Artificial Intelligence 
- Azure Key vault: Secret and key managemet service
- Azure App Service: Application hosting service
- Monnify API: Third Party Transaction
- Docker: Containerization software
- JWT: For user authentication.
- Bcrypt: Password hashing.

### Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/okikiolanlesi/p2p-loan-backend.git
   cd p2p-loan-Frontend
2. Install dependencies:
    ```bash
    npm install
3. Set up a environment
    Create a .env file in the root directory and add:
    ```bash
    DB_CONNECTION=sqlsrv
    DB_HOST=127.0.0.1
    DB_PORT=5000
    DB_DATABASE=mydbserver
    DB_USERNAME=johndoe
    DB_PASSWORD=johndoe123

4. Run the Application
    ```bash
    npm run dev

The application will run on http://localhost:5000.

### Key Files and Folders

- **`routes/`**: Contains route handlers (e.g., loans, users).
- **`controllers/`**: Contains the logic for API routes.
- **`models/`**: MongoDB schemas for users and loans.

### Deployment Process

1. **Build the production version**:

### API Endpoints
- Authentication
    - POST /api/auth/register: Register a new user.
    - POST /api/auth/login: Authenticate and login.
- Loan Management
    - POST /api/loans/request: Create a new loan request.
    - GET /api/loans/: Retrieve loan details.
- User Management
    - GET /api/users/profile: Get the logged-in user’s profile.
    - PUT /api/users/update: Update user details.

### Troubleshooting
- Frontend
    - Issue: API requests fail.
    - Solution: Verify the backend URL in the .env file and ensure the backend server is running.
- Backend
    1. Issue: SQL Server connection errors.
        - Solution: Check the SQL Server URI and ensure the database is running.
    2. Issue: Authentication errors.
        - Solution: Ensure JWT tokens are correctly generated and passed in headers.