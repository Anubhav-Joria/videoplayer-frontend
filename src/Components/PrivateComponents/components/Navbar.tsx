import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

export default function ButtonAppBar() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userEmail");
    sessionStorage.removeItem("isLoggedIn");
    navigate("/auth");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ color: "#ffffff", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Video Player
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{ color: "#ffffff", cursor: "pointer" }}
            onClick={() => navigate("/add")}
          >
            Add Entry
          </Typography>
          <Button onClick={handleLogout} color="inherit" >
            Logout <LogoutIcon/>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
