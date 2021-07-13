import React, { FormEvent, useContext, useState } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@material-ui/core";
import axios from "../axiosConfig";
import { parse as parseQueryString } from "query-string";

import { LoginRequest, RegisterFields } from "../common/interfaces/requests";

import UserContext from "../store/userContext";
import { setAccessToken } from "../store/accessToken";
import { useFormStyles } from "../ui/formStyles";

interface QueryString {
  next?: string;
}

const LoginPage: React.FC = () => {
  const userContext = useContext(UserContext);
  const classes = useFormStyles();
  const parsedQuery: QueryString = parseQueryString(useLocation().search);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<RegisterFields>({
    username: "",
    email: "",
    password: "",
    bojId: "",
    cfId: "",
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const data: LoginRequest = { username, password };
    try {
      const res = await axios.post("/login", data);
      setAccessToken(res.data.accessToken);
      console.log(res.data);
      await userContext.handleLogin(username);
    } catch (err) {
      const errors: RegisterFields = err.response.data.errors;
      setErrors(errors);
    }
  };
  if (userContext.user.username) {
    // go to next if exists; else, return home
    return <Redirect to={parsedQuery.next ?? "/"} />;
  }

  return (
    <Container maxWidth="xs">
      <Typography variant="h1">Sign in to Compete</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          className={classes.textInputField}
          label="Username"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          required
          autoFocus
          fullWidth
          error={errors.username.length > 0}
          helperText={errors.username}
        />
        <TextField
          className={classes.textInputField}
          label="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
          error={errors.password.length > 0}
          helperText={errors.password}
        />
        <Box marginTop={2}>
          <Button type="submit" onClick={handleSubmit}>
            Sign in
          </Button>
        </Box>

        <div>
          <Typography>
            Need an account? <Link to="/register">Sign up now.</Link>
          </Typography>
        </div>
      </form>
    </Container>
  );
};

export default LoginPage;
