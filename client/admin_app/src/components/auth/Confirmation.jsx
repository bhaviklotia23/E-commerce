import { Grid, Paper, Typography } from '@mui/material'
import React from 'react'
const paperStyle={
    height: "45vh",
    width: "580px",
    padding: "40px",
    margin: "90px auto"
};
const Confirmation = () => {
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
         <Typography component="h3" variant="h4" sx={{margin: " 100px auto",textAlign:"center"}}>
           Reset Password link has been sent to &nbsp; gmail
         </Typography>
      </Paper>
    </Grid>
  )
}

export default Confirmation