import React, { useState } from "react";
import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Form, FormikProvider, useFormik } from "formik";
import EmailIcon from "@mui/icons-material/Email";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
const forgotpaper = {
  height: "45vh",
  width: "320px",
  padding: "40px",
  margin: "90px auto",
};
const initialState = {
  email: "",
};
const validationschema = Yup.object({
  email: Yup.string("Enter the valid email address")
    .email()
    .required()
    .label("Email"),
});

const ForgotPassword = () => {
  const [initForgot, setInitForgot] = useState(initialState);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initForgot,
    validationSchema: validationschema,
    enableReinitialize: true,
  });
  return (
    <Grid>
      <Paper elevation={10} style={forgotpaper}>
        <Grid item sx={{ textAlign: "center" }}>
          <Avatar
            sx={{
              bgcolor: "#2196f3",
              textAlign: "center",
              display: "inline-flex",
              marginBottom: "20px",
            }}
          >
            <EmailIcon />
          </Avatar>
          <Typography component="h2" variant="h5">
            Forgot Password ?
          </Typography>
        </Grid>
        <Typography component="h2" variant="subtitle1" sx={{textAlign:"center"}}>
         Enter your Email below and reset your password
        </Typography>

        <TextField
          id="email"
          name="email"
          label="Email"
          type={"email"}
          variant="standard"
          fullWidth
          required
          sx={{ marginBottom: "10px" }}
        />
        <Grid sx={{ marginTop: "30px", textAlign: "center" }}>
          <Button
            type="submit"
            variant="contained"
            sx={{ bgcolor: "#2196f3" }}
            onClick={() => navigate("/auth/confirm")}
          >
            Send
          </Button>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default ForgotPassword;
