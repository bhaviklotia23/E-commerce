import React, { useState } from "react";
import {
  Avatar,
  Grid,
  Paper,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { useFormik, FormikProvider, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { RegisterUser } from "../../redux/action/AuthActions";
import LockIcon from "@mui/icons-material/Lock";

const paperStyle = {
  height: "60vh",
  width: "320px",
  padding: "40px",
  margin: "60px auto",
};

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is Required"),
  lastName: Yup.string().required("Last Name is Required"),
  email: Yup.string("Enter a valid email address")
    .email()
    .required()
    .label("Email"),
});

const Signup = () => {
  const [initFormData, setInitFormData] = useState(initialState);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: initFormData,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => onSubmit(values),
  });

  const onSubmit = () => {
    const sendValues = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      role: "admin",
    };
    dispatch(RegisterUser(sendValues));
  };

  const { handleChange, handleSubmit, values, errors, touched, handleBlur } =
    formik;

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit}>
            <Grid align="center">
              <Avatar sx={{ bgcolor: "#2196f3" }}>
                <LockIcon />
              </Avatar>
              <Typography component="h2" variant="h6">
                Register
              </Typography>
            </Grid>
            <TextField
              type="text"
              label="FirstName"
              variant="standard"
              fullWidth
              id="firstName"
              sx={{ marginBottom: "5px" }}
              onChange={handleChange}
              value={values.firstName}
              name="firstName"
              required
              error={errors.firstName && touched.firstName}
              helperText={
                errors.firstName && touched.firstName ? errors.firstName : null
              }
            />
            <TextField
              type="text"
              id="lastName"
              label="LastName"
              name="lastName"
              variant="standard"
              fullWidth
              sx={{ marginBottom: "5px" }}
              onChange={handleChange}
              value={values.lastName}
              required
              error={errors.lastName && touched.lastName}
              helperText={
                errors.lastName && touched.lastName ? errors.lastName : null
              }
            />
            <TextField
              label="Email"
              id="email"
              type="email"
              name="email"
              variant="standard"
              fullWidth
              sx={{ marginBottom: "5px" }}
              onChange={handleChange}
              value={values.email}
              required
              error={errors.email && touched.email}
              helperText={errors.email && touched.email ? errors.email : null}
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              variant="standard"
              fullWidth
              sx={{ marginBottom: "5px" }}
              onChange={handleChange}
              value={values.password}
              required
              error={errors.password && touched.password}
              helperText={
                errors.password && touched.password ? errors.password : null
              }
            />
            <Grid sx={{ marginTop: "30px" }}>
              <Button
                type="submit"
                variant="contained"
                sx={{ bgcolor: "#2196f3" }}
              >
                Register
              </Button>
            </Grid>
          </Form>
        </FormikProvider>
      </Paper>
    </Grid>
  );
};

export default Signup;
