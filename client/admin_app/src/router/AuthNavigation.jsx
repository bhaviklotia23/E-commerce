import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthNavigation = () => {
  const location = useLocation();
  const user = useSelector((state) => state?.AuthReducer);

  return user?.user?.token ? (
    <Navigate to="/" />
  ) : (
    <div>
      {location.pathname === "/auth/login" ||
      location.pathname === "/auth/sign-up" ||
      location.pathname === "/auth/forgotpassword" ? (
        <Outlet />
      ) : (
        <>
          <Outlet />
        </>
      )}
    </div>
  );
};

export default AuthNavigation;
