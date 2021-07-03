import React, { FormEvent, useContext, useState } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import axios from "../axiosConfig";
import { parse as parseQueryString } from "query-string";

import { LoginRequest } from "../common/interfaces";

import UserContext from "../store/userContext";
import { setAccessToken } from "../store/accessToken";

interface QueryString {
  next?: string;
}

const LoginPage: React.FC = () => {
  const userContext = useContext(UserContext);
  const parsedQuery: QueryString = parseQueryString(useLocation().search);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const data: LoginRequest = { username, password };
    try {
      const res = await axios.post("/login", data);
      setAccessToken(res.data.accessToken);
      userContext.handleLogin(username);
    } catch (err) {
      const errors = Object.values<string>(err.response.data.errors);
      setErrors(errors.filter((msg) => msg.length > 0));
    }
  };
  if (userContext.username) {
    // go to next if exists; else, return home
    return <Redirect to={parsedQuery.next ?? "/"} />;
  }

  return (
    <div>
      <Typography variant="h5">Sign in to Cubers</Typography>
      <Grid container xs={12} xl={3}>
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              label="Username"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div>
            <TextField
              label="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <Button type="submit" onClick={handleSubmit}>
              Sign in
            </Button>
          </div>

          {/* errors */}
          {errors.length > 0 && (
            <div>
              <Typography variant="body1">
                The following errors were found:
              </Typography>
              <ul>
                {errors.map((error: string, i: number) => (
                  <Typography component="li" key={i} variant="body2">
                    {error}
                  </Typography>
                ))}
              </ul>
            </div>
          )}
          <div>
            <Typography>
              Need an account? <Link to="/register">Sign up now.</Link>
            </Typography>
          </div>
        </form>
      </Grid>
    </div>
  );
};

export default LoginPage;
