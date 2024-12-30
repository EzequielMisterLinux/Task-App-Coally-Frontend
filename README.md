# Task Management Frontend

A modern, responsive React application for task management built with TypeScript, Vite, and TailwindCSS. Features include user authentication, task management, and a clean UI using DaisyUI components.

## 🚀 Features

- User authentication (login/register)
- Task management dashboard
- Real-time task statistics
- Responsive design
- Dark/Light theme support
- Form validation
- Alert notifications
- Secure API integration

## 🛠️ Technology Stack

- **React 18**: UI library
- **TypeScript**: Programming language
- **Vite**: Build tool and development server
- **TailwindCSS**: Utility-first CSS framework
- **DaisyUI**: UI component library
- **React Router DOM**: Navigation
- **React Hook Form**: Form handling
- **Zod**: Schema validation
- **Axios**: HTTP client
- **Lucide React**: Icon library
- **HeadlessUI**: Accessible UI components

## 🏗️ Project Structure

```
src/
├── api/          # API integration services
├── components/   # Reusable UI components
├── context/      # React context providers
├── interfaces/   # TypeScript interfaces
├── modals/       # Modal components
├── pages/        # Page components
├── types/        # TypeScript type definitions
└── utils/        # Utility functions
```

### Key Components:

- **Context**:
  - `AuthContext`: Manages authentication state
  - `TaskContext`: Handles task state and operations

- **Components**:
  - `Layout`: Main application layout
  - `TaskHeader`: Dashboard header
  - `TaskStats`: Task statistics display
  - `TaskList`: List of tasks
  - `LoginForm`: Authentication form

## 🚦 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

### Environment Setup

Create a `.env` file in the root directory:

```env
VITE_API_URL='http://localhost:3000/api'
VITE_IMG_URL='http://localhost:3000'
```

### Installation

1. Clone the repository:
```bash
git clone https://github.com/EzequielMisterLinux/Task-App-Coally-Frontend.git
cd Task-App-Coally-Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint

## 💻 Development

### State Management

The application uses React Context for state management:

#### Auth Context
```typescript
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
```

#### Task Context
```typescript
interface TaskContextType {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  todayTasks: Task[];
  completedTasks: Task[];
  pendingTasks: Task[];
  // ... methods
}
```

### Component Examples

#### Dashboard Page
```typescript
const DashboardPage = () => (
  <Layout>
    <div className="space-y-6">
      <TaskHeader />
      <TaskStats />
      <TaskList />
    </div>
  </Layout>
);
```

### Styling

The project uses TailwindCSS with DaisyUI for styling:

```javascript
// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui")
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake", "dracula"],
  },
};
```

## 🔒 Authentication

The application implements a complete authentication flow:

- Login
- Registration
- Protected routes
- Automatic token refresh
- Session management

## 📱 Responsive Design

The UI is fully responsive and supports:
- Desktop layouts
- Tablet layouts
- Mobile layouts

## 🎨 Theming

DaisyUI provides multiple theme options:
- Light
- Dark
- Cupcake
- Dracula

## 🚀 Building for Production

1. Build the application:
```bash
npm run build
```

2. Preview the build:
```bash
npm run preview
```

## 🔧 Configuration

### Vite Configuration
The project uses Vite's default configuration with React-SWC plugin for fast development and building.

### ESLint Configuration
ESLint is configured with React and TypeScript support for code quality.

## 📦 Dependencies

### Production Dependencies
- `@headlessui/react`: UI components
- `@heroicons/react`: Icons
- `@hookform/resolvers`: Form validation
- `axios`: HTTP client
- `react-hook-form`: Form handling
- `react-router-dom`: Routing
- `zod`: Schema validation

### Development Dependencies
- `@tailwindcss/typography`: Typography plugin
- `daisyui`: UI component library
- `typescript`: TypeScript support
- `vite`: Build tool

