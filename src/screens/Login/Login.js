import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../configs/constants";
import { useSnackbar } from "notistack";

const Login = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const submithandler = async () => {
    enqueueSnackbar("Logging In");
    if (username === "" || password === "") {
      enqueueSnackbar("Please fill all the fields", { variant: "error" });
      return;
    }
    if (username === "admin" && password === "admin") {
      enqueueSnackbar("Login Successful", { variant: "success" });
      navigate("/admin");
      return;
    }
    if (username !== "admin" && password !== "admin") {
      enqueueSnackbar("Invalid Credentials", { variant: "error" });
      return;
    }
  };
  return (
    <Box
      className={
        "flex justify-center items-center mt-5 sm:mt-20 w-screen h-screen overflow-hidden"
      }
    >
      <Stack className=" p-16" direction={"column"} spacing={3}>
        <Typography className="text-center" variant="h4">
          Admin Login
        </Typography>

        <TextField
          className="w-72 text-center"
          label="Username"
          variant="outlined"
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          className="w-72"
          label="Password"
          type="password"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button className="h-12 mt-10" onClick={submithandler}>
          submit
        </Button>
      </Stack>
    </Box>
  );
};

export default Login;
