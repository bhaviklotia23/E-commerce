import React from "react";
import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
const resetPaper = {
  height: "45vh",
  width: "320px",
  padding: "40px",
  margin: "90px auto",
};
const ResetPassword = () => {
  return (
    <Grid>
      <Paper elevation={10} style={resetPaper}>
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
            Reset Password
          </Typography>
        </Grid>

        <TextField
          id="Password"
          name="Password"
          label="Password"
          type="Password"
          variant="standard"
          fullWidth
          required
          sx={{ marginBottom: "10px" }}
        />
        <TextField
          id="Confirm Password"
          name="Confirm Password"
          label="Confirm Password"
          type="email"
          variant="standard"
          fullWidth
          required
          sx={{ marginBottom: "10px" }}
        />
        <Grid sx={{textAlign:"center",paddingTop: "20px"}}>
          <Button
            type="submit"
            variant="contained"
            sx={{ bgcolor: "#2196f3" }}
          >
            Reset
          </Button>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default ResetPassword;
