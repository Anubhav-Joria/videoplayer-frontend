import { useState } from "react";
import { Grid, TextField, Typography, Button } from "@mui/material";
import axios from "axios";
import { StyledBox } from "./styled";
import { useNavigate } from "react-router-dom";

function Signup({ setShowLogin }: any) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/api/signup`,
        data: {
          name: name,
          email: email,
          password: password,
        },
      });
      sessionStorage.setItem("token", res.data?.token);
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("userEmail", res.data.email);
      navigate("/");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <StyledBox mt={5} p={4} sx={{ boxShadow: 2 }}>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          spacing={3}
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Grid item xs={12}>
            <Typography variant="h5"> Signup Form</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="text"
              label="Name"
              variant="outlined"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="email"
              label="email"
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
            <Button variant="contained" type="submit">
              {" "}
              Create account
            </Button>
          </Grid>
        </Grid>
      </form>
      <Typography mt={3}>
        Existing User?&nbsp;
        <Button
          variant="outlined"
          size="small"
          onClick={() => setShowLogin(true)}
        >
          Login
        </Button>
      </Typography>
    </StyledBox>
  );
}

export default Signup;
