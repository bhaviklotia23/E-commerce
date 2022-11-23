import Signup from "../components/auth/Signup";
import Layout from "../layout";
import { Dashboard } from "../pages/Dashboard/Dashboard";
import AuthNavigation from "./AuthNavigation";
import ManageProfile from "../pages/user-profile/manage-profile";
import Login from "../components/auth/Login";
import ForgotPassword from "../components/auth/ForgotPassword";
import Confirmation from "../components/auth/Confirmation";
import ResetPassword from "../components/auth/ResetPassword";

export const Router = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/manage-profile", element: <ManageProfile /> },
    ],
  },
  {
    path: "auth",
    element: <AuthNavigation />,
    children: [
      { path: "sign-up", element: <Signup /> },
      { path: "login", element: <Login /> },
      { path: "forgot-pass", element: <ForgotPassword /> },
      { path: "confirm", element: <Confirmation /> },
      { path: "reset-pass", element: <ResetPassword /> },
    ],
  },
];
