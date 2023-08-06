import React, { useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import { StyledBox } from "./styled";
import { useNavigate } from "react-router-dom";
function Login({ setShowLogin }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/api/signin`,
        data: {
          email: email,
          password: password,
        },
      });
      console.log(res);
      sessionStorage.setItem("token", res.data?.token);
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("userEmail", res.data.email);

      navigate("/");
    } catch (err : any) {
      alert(err?.response?.data.message);
    }
  };

  return (
    <StyledBox mt={5} p={4} sx={{ boxShadow: 2 }}>
      <form onSubmit={handleLogin}>
        <Grid
          container
          spacing={3}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12}>
            <Typography variant="h5"> Login Form</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="email"
              label="Email"
              variant="outlined"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="password"
              label="Password"
              variant="outlined"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained">
              {" "}
              Login{" "}
            </Button>
          </Grid>
        </Grid>
      </form>
      <Typography mt={3}>
        {" "}
        New User?{" "}
        <Button
          variant="outlined"
          size="small"
          onClick={() => setShowLogin(false)}
        >
          Register
        </Button>
      </Typography>
    </StyledBox>
  );
}

export default Login;
