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

const RegisterPage: React.FC = () => {
  const userContext = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    // it is okay to send passwords over HTTPS
    const data = { username, email, password };
    try {
      const res = await axios.post("/register", data);
      setAccessToken(res.data.accessToken);
      userContext.handleLogin(username);
    } catch (err) {
      const errors = Object.values<string>(err.response.data.errors);
      setErrors(errors.filter((msg) => msg.length > 0));
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
            <div>
              <TextField
                label="Username"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                required
                autoFocus
                fullWidth
                // variant="outlined"
              />
            </div>
            <div>
              <TextField
                label="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
              />
            </div>
            <div>
              <TextField
                label="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
              />
            </div>
            <div>
              <Button type="submit" onClick={handleSubmit}>
                Sign up
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
                Already have an account? <Link to="/login">Sign in now.</Link>
              </Typography>
            </div>
            <FormHelperText>Passwords are not stored.</FormHelperText>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default RegisterPage;
