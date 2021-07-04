import React, { FormEvent, useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "../axiosConfig";
import {
  Button,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";

import UserContext from "../store/userContext";
import { setAccessToken } from "../store/accessToken";
import { RegisterFields } from "../common/interfaces/requests";

const RegisterPage: React.FC = () => {
  const userContext = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bojId, setBojId] = useState("");

  const [errors, setErrors] = useState<RegisterFields>({
    username: "",
    email: "",
    password: "",
    bojId: "",
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    // it is okay to send passwords over HTTPS
    const data: RegisterFields = { username, email, password, bojId };
    try {
      const res = await axios.post("/register", data);
      setAccessToken(res.data.accessToken);
      userContext.handleLogin(username);
    } catch (err) {
      const errors: RegisterFields = err.response.data.errors;
      console.log(errors);
      setErrors(errors);
    }
  };

  if (userContext.username) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <Typography variant="h5">Sign up for Cubers</Typography>
      <Grid container>
        <Grid item xs={12} xl={3}>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <Grid container direction="column">
              <Grid item>
                <TextField
                  label="Username"
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoFocus
                  fullWidth
                  error={errors.username.length > 0}
                  helperText={errors.username}
                  // variant="outlined"
                />
              </Grid>
              <Grid>
                <TextField
                  label="Email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  fullWidth
                  error={errors.email.length > 0}
                  helperText={errors.email}
                />
              </Grid>
              <Grid>
                <TextField
                  label="Password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  fullWidth
                  error={errors.password.length > 0}
                  helperText={errors.password}
                />
              </Grid>
              <Grid>
                <TextField
                  label="BOJ Handle"
                  type="text"
                  onChange={(e) => setBojId(e.target.value)}
                  required
                  fullWidth
                  error={errors.bojId.length > 0}
                  helperText={errors.bojId}
                />
              </Grid>
            </Grid>
            <div>
              <Button type="submit" onClick={handleSubmit}>
                Sign up
              </Button>
            </div>

            {/* errors */}
            {/* {errors.length > 0 && (
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
            )} */}

            <div>
              <Typography>
                Already have an account? <Link to="/login">Sign in now.</Link>
              </Typography>
            </div>
            <FormHelperText>We will never store your password.</FormHelperText>
            <FormHelperText>
              To use this tool, you need an account on{" "}
              <a href="https://www.acmicpc.net/">Baekjoon Online Judge</a>.
            </FormHelperText>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default RegisterPage;
