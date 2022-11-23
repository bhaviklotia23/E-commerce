import React, { useState } from "react";
import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { FormikProvider, useFormik, Form } from "formik";
import { useDispatch } from "react-redux";
import { Logins } from "../../redux/action/AuthActions";

const loginPaper = {
  height: "50vh",
  width: "320px",
  padding: "40px",
  margin: "60px auto",
};

const initialState = {
  email: "",
  password: "",
};

const validationschema = Yup.object({
  email: Yup.string("Enter a valid email address")
    .email()
    .required()
    .label("Email"),
  // password:Yup.string()
  // .required('Please Enter your password')
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
  //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
  // ),
});

const Login = () => {
  const [initFormData, setInitFormData] = useState(initialState);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: initFormData,
    validationSchema: validationschema,
    enableReinitialize: true,
    onSubmit: (values) => {
      dispatch(Logins(values));
    },
  });
  const { handleChange, handleSubmit, values, errors, touched, handleBlur } =
    formik;
  return (
    <Grid container>
      <Paper elevation={10} style={loginPaper}>
        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit}>
            <Grid item sx={{ textAlign: "center" }}>
              <Avatar
                sx={{
                  bgcolor: "#2196f3",
                  textAlign: "center",
                  display: "inline-flex",
                }}
              >
                <LockIcon />
              </Avatar>
              <Typography component="h2" variant="h6">
                Login
              </Typography>
            </Grid>

            <TextField
              id="email"
              name="email"
              label="Email"
              type={"email"}
              variant="standard"
              fullWidth
              onChange={handleChange}
              value={values.email}
              error={errors.email && touched.email}
              helperText={errors.email && touched.email ? errors.email : null}
              sx={{ marginBottom: "5px" }}
            />
            <TextField
              id="password"
              name="password"
              label="Password"
              type={"password"}
              variant="standard"
              onChange={handleChange}
              value={values.password}
              error={errors.password && touched.password}
              helperText={
                errors.password && touched.password ? errors.password : null
              }
              fullWidth
              sx={{ marginBottom: "5px" }}
            />
            <Grid sx={{ marginTop: "30px", textAlign: "center" }}>
              <Button
                type="submit"
                variant="contained"
                sx={{ bgcolor: "#2196f3" }}
              >
                Login
              </Button>
            </Grid>
            <Typography sx={{ textAlign: "center", padding: "20px 0px 10px" }}>
              <Link to="/auth/forgot-pass">Forget Password</Link>
            </Typography>
            <Typography sx={{ textAlign: "center", padding: "10px" }}>
              Don't have an account? &nbsp;
              <Link to="/auth/sign-up">Register</Link>
            </Typography>
          </Form>
        </FormikProvider>
      </Paper>
    </Grid>
  );
};

export default Login;
