import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/ui/Sidebar";
import NavbarCom from "../components/ui/Navbar.jsx";
import { Grid } from "@mui/material";

const Layout = () => {
  // const location = useLocation();
  // const user = useSelector((state) => state?.AuthReducer?.user);
  // console.log("--   user", user);

  // if (user?.token && location?.pathname === "/") {
  //   return <Navigate to="/" />;
  // }

  return (
    <Grid>
      <NavbarCom />
      <Sidebar />
      <Grid
        sx={{ marginLeft: { xs: "256px", md: "none" }, overflow: "hidden" }}
      >
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default Layout;
