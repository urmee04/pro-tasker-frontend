## Project: Full-Stack MERN Application

---

### Pro-Tasker Frontend

A modern, responsive React (Vite) frontend for the Pro-Tasker project management application.

---

### Overview

Pro-Tasker is a collaborative project management tool that allows users to create projects, manage tasks, and collaborate with team members.  
This frontend application is built with React and Material UI, and it connects to the Node.js/Express/MongoDB backend API.

---

### Features

- **User Authentication:** Secure login and registration with JWT tokens
- **Project Management:** Create, view, update, and delete projects
- **Task Management:** Full CRUD operations for tasks within projects
- **Responsive Design:** Optimized for desktop, tablet, and mobile devices
- **Real-time Updates:** UI updates dynamically based on API responses

---

### Tech Stack

- **MongoDB Atlas** - Cloud database service
- **React (Vite)** – Frontend framework and build tool
- **React Router DOM** – Client-side routing
- **Context API** – Global state management (AuthContext)
- **Axios** – HTTP client with request interceptors for authentication
- **Material-UI (MUI)** – UI components and styling
- **JWT** – Authentication token handling
- **MUI styles** – Responsive design
- **Render** - Platform-as-a-Service for deployment
- **Git** - Version control system

---

### Deployment

- [Frontend Static Site](https://pro-tasker-frontend-sxmf.onrender.com)
- [Backend Web Service](https://pro-tasker-backend-v3k9.onrender.com)

---
### Pro-Tasker-Backend
- [Backend GitHub Link](https://github.com/urmee04/pro-tasker-backend)

---

### Project Structure

```bash
src/
├── api/ # API service functions
│ ├── auth.js # Authentication-related API calls
│ ├── axios.js # Axios instance configuration
│ ├── projects.js # Project-related API calls
│ └── tasks.js # Task-related API calls
│
├── components/ # Reusable UI components (buttons, etc.)
│
├── context/ # React Context for state management (Auth, Projects, UI)
│
├── pages/ # Page-level components
│ ├── Dashboard.jsx # Dashboard view
│ ├── Login.jsx # Login page
│ ├── ProjectDetails.jsx # Project details and tasks
│ └── Signup.jsx # Signup/Registration page
│
├── App.jsx # Root app component with routing
├── main.jsx # Entry point (ReactDOM.render / createRoot)
```

---

### Installation

1. Clone the repository:

```bash
git clone https://github.com/urmee04/pro-tasker-frontend.git
cd pro-tasker-frontend
```

2. Install dependencies:

   `npm install`

3. Create a .env file in the project root and add your environment variables:

   `VITE_BASE_URL=http://localhost:3000/api`

4. Start the development server:

 `npm run dev`

 `The application will run at http://localhost:5173`

---

### Available Scripts

- **npm run dev** # Runs the app in development mode
- **npm run build** # Builds the app for production
- **npm run preview** # Previews the production build locally

---

### API Integration

The frontend communicates with the backend using Axios. Example endpoints:

#### Authentication

- `POST /api/users/signup` → User registration

- `POST /api/users/login` → User login

#### Projects

- `GET /api/projects` → Get all projects for the user

- `POST /api/projects` → Create a new project

- `GET /api/projects/:id` → Get a specific project

- `PUT /api/projects/:id` → Update a project

- `DELETE /api/projects/:id` → Delete a project

#### Tasks

- `POST /api/projects/:projectId/tasks` → Create a new task

- `GET /api/projects/:projectId/tasks` → Get all tasks for a project

- `PUT /api/tasks/:taskId` → Update a task

- `DELETE /api/tasks/:taskId` → Delete a task

---

### State Management

The application uses React Context API for global state management:

- **AuthContext:** Manages user authentication state, tokens, and signup/login/logout functions

### Responsive Design

Built with a mobile-first approach using Material-UI components and responsive layouts, ensuring a seamless experience across devices.

---

### Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m "Add amazing feature"`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---
### References

- [React Hook Documentation](https://react.dev/reference/react)
- [Context API](https://react.dev/learn/passing-data-deeply-with-context)
- [Context API Tutorial](https://www.youtube.com/watch?v=oc3VM6Mqqx0)
- [Material UI](https://mui.com/material-ui/getting-started/)
- [MDN LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

---

### Acknowledgements

This project was completed as part of the **Per Scholas** curriculum under the guidance of instructors [Tishana Trainor](https://www.linkedin.com/in/tishana-trainor/) and [Bryan Santos](https://www.linkedin.com/in/bryandevelops/).
