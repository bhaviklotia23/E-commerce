import React, { useState, useEffect } from "react";
import { Grid, Avatar, Box, TextField, Button, Paper } from "@mui/material";
import { useFormik, FormikProvider, Form } from "formik";
import { getUserProfile } from "../../redux/action/AuthActions";

import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";

const loginPaper = {
  height: "56vh",
  width: "700px",
  padding: "40px",
  margin: "2px auto"
};

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  role: ""
};
const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is Required"),
  lastName: Yup.string().required("Last Name is Required"),
  email: Yup.string("Enter a valid email address")
    .email()
    .required()
    .label("Email")
});

const ManageProfile = () => {
  const [initFormData, setInitFormData] = useState(initialState);
  const dispatch = useDispatch();

  const user = useSelector((state) => {
    return state.AuthReducer.user;
  });
  console.log("~ user", user);

  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  const formik = useFormik({
    initialValues: initFormData,
    validationSchema: validationSchema,
    enableReinitialize: true
    // onSubmit: (values) => onSubmit(values),
  });

  const { handleChange, handleSubmit, values, errors, touched, handleBlur } =
    formik;

  // const onSubmit = () => {
  //   const sendValues = {
  //     firstName: values.firstName,
  //     lastName: values.lastName,
  //     email: values.email,
  //     password: values.password,
  //     role: "admin",
  //   };
  //   dispatch(RegisterUser(sendValues));
  // };

  return (
    <Grid>
      <Paper elevation={10} style={loginPaper}>
        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit}>
            <Grid container align="center" mt={4} sx={{ marginLeft: "230px" }}>
              <Box display={"flex"} mr={1} maxWidth="100%">
                <Box>
                  <Avatar
                    sx={{
                      width: "150px",
                      height: "150px",
                      borderRadius: "15px"
                    }}
                  />
                </Box>
              </Box>
            </Grid>

            <Grid container mt={2}>
              <Grid item md={6} xs={12} pr={2}>
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
                    errors.firstName && touched.firstName
                      ? errors.firstName
                      : null
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
              </Grid>

              <Grid item md={6} xs={12} pr={2}>
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
                  error={errors.email && touched.email}
                  helperText={
                    errors.email && touched.email ? errors.email : null
                  }
                />

                <TextField
                  label="Role"
                  id="role"
                  type="role"
                  name="role"
                  variant="standard"
                  fullWidth
                  sx={{ marginBottom: "5px" }}
                  onChange={handleChange}
                  value={values.role}
                  error={errors.role && touched.role}
                  helperText={errors.role && touched.role ? errors.role : null}
                />
              </Grid>

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{ width: "100%", marginTop: "6px" }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ bgcolor: "#2196f3" }}
                >
                  Save
                </Button>
              </Box>
            </Grid>
          </Form>
        </FormikProvider>
      </Paper>
    </Grid>
  );
};

export default ManageProfile;
