# P2P Loan Application

This is a decentralized platform for peer-to-peer loans. The application consists of a **frontend** built with React.js and a **backend** developed using Node.js and Express.js. The frontend provides the user interface for borrowers and lenders, while the backend handles authentication, business logic, and database operations.

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
4. [Testing](#testing)
5. [Troubleshooting](#troubleshooting)

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
   cd P2P-Loan-Frontend
2. Install dependencies:
    ```bash
    npm install
3. Set up a environment
    Create a .env file in the root directory and add:
    ```bash
    REACT_APP_BACKEND_URL=<backend_api_url>
4. Run the Application
    ```bash
    npm start

the applicarion will run on http://localhost:3000.

### Key Files and Folders

- **`src/`**: Contains React components and logic.
  - **`components/`**: Reusable components like forms and layout elements.
  - **`pages/`**: Specific pages (e.g., dashboard, login, register).
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
- Node.js: Backend runtime.
- Express.js: Web framework.
- MongoDB: NoSQL database.
- JWT: For user authentication.
- Bcrypt: Password hashing.
- Setup Instructions
- Clone the repository: