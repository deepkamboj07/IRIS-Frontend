import { Navigate } from "react-router-dom";
import LoginLayout from "../layout/LoginLayout";
import { RootLayout } from "../layout/RootLayout";
import ForgetPassword from "../page/Auth/forget-password";
import LoginPage from "../page/Auth/Login";
import Register from "../page/Auth/Register";
import Profile from "../page/Profile";
import { ProtectedRoute } from "../Wrapper/ProtecteWaraper/ProtectedRoute";
import Project from "../page/task";
import Tasks from "../page/task/projectTasks";


export const routes = [
  {
    path: "/auth",
    element: <LoginLayout/>,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "forget-password",
        element: <ForgetPassword/>,
      },
      {
        path: "register",
        element: <Register />,
      }
    ],
  },
  {
    path: "",
    element: (
      <ProtectedRoute>
        <RootLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "tasks",
        element: <Project />,
      },
      {
        path: "projectTasks",
        element: <Tasks />,
      }
    ],
  },
  {
    path:"*",
    element: <Navigate to="/" replace />
  }
]