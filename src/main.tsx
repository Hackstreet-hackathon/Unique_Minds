import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./components/Login.tsx";
import ErrorPage from "./components/Error.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
// import Login from "./components/LoginSupa.tsx";
import StudentDashboard from './routes/StudentDashboard.tsx';
import QuizPage from './routes/Quiz.tsx';
import Leaderboard from "./routes/LeaderBoard.tsx";
import UserProfile from "./routes/UserShowPage.tsx";
import TaskPage from "./routes/TaskPage.tsx";
import { CelebrationExample } from "./routes/Celebration.tsx";
import AdminDashboard from './routes/AdminDashboard.tsx';
import SignupPage from "./routes/Signup.tsx";
import StudentChat from "./routes/Chat.tsx";
import TechniquesPage from "./routes/Techniques.tsx";
import PomodoroPage from "./routes/techniques/PomodoroPage.tsx";
import SpacedRepetitionPage from "./routes/techniques/SpacedRepetitionPage.tsx";
import ActiveRecallPage from "./routes/techniques/ActiveRecallPage.tsx";
import FeynmanPage from "./routes/techniques/FeynmanPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/techniques",
    element: <TechniquesPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/techniques/pomodoro",
    element: <PomodoroPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/techniques/spaced-repetition",
    element: <SpacedRepetitionPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/techniques/active-recall",
    element: <ActiveRecallPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/techniques/feynman",
    element: <FeynmanPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <StudentDashboard />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/quiz",
    element: <QuizPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Leaderboard",
    element: <Leaderboard />,
    errorElement: <ErrorPage />,
  },
  // user/:id
  {
    path: "/user/:id",
    element: <UserProfile />,
    errorElement: <ErrorPage />,  
  },
  {
    path: "/task",
    element: <TaskPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/celebrate",
    element: <CelebrationExample />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/chat",
    element: <StudentChat />,
    errorElement: <ErrorPage />,
  }
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>
);
