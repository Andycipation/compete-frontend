import React, { FormEvent, useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "../axiosConfig";
import {
  Box,
  Button,
  Container,
  FormHelperText,
  TextField,
  Typography,
  useTheme,
} from "@material-ui/core";

import UserContext from "../store/userContext";
import { setAccessToken } from "../store/accessToken";
import { RegisterFields } from "../common/interfaces/requests";
import { useFormStyles } from "../ui/formStyles";
import PopoutLink from "../components/PopoutLink";

const RegisterPage: React.FC = () => {
  const userContext = useContext(UserContext);
  const theme = useTheme();
  const classes = useFormStyles();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bojId, setBojId] = useState("");
  const [cfId, setCfId] = useState("");

  const [errors, setErrors] = useState<RegisterFields>({
    username: "",
    email: "",
    password: "",
    bojId: "",
    cfId: "",
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    // it is okay to send passwords over HTTPS
    const data: RegisterFields = { username, email, password, bojId, cfId };
    try {
      const res = await axios.post("/register", data);
      setAccessToken(res.data.accessToken);
      await userContext.handleLogin(username);
    } catch (err) {
      const errors: RegisterFields = err.response.data.errors;
      setErrors(errors);
    }
  };

  if (userContext.user.username) {
    return <Redirect to="/" />;
  }

  return (
    <Container maxWidth="xs">
      <Typography variant="h1">Sign up for Compete</Typography>
      <Typography variant="body2">
        Already have an account? <Link to="/login">Sign in now.</Link>
      </Typography>

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
          // variant="outlined"
        />
        <TextField
          className={classes.textInputField}
          label="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
          error={errors.email.length > 0}
          helperText={errors.email}
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
        <FormHelperText>We will never store your password.</FormHelperText>
        {/* TODO: add a "confirm password" field? */}

        <Typography variant="h3" style={{ marginTop: theme.spacing(5) }}>
          Judge Usernames
        </Typography>
        <Typography variant="body2">
          Link your judge accounts here to get problem recommendations.
        </Typography>

        {/* Baekjoon Online Judge */}
        <TextField
          className={classes.textInputField}
          label="Baekjoon Online Judge Username"
          type="text"
          onChange={(e) => setBojId(e.target.value)}
          // required
          fullWidth
          error={errors.bojId.length > 0}
          helperText={errors.bojId}
        />
        <FormHelperText>
          You can register a Baekjoon Online Judge account{" "}
          <PopoutLink to="https://www.acmicpc.net/register">here</PopoutLink>.
        </FormHelperText>

        <TextField
          className={classes.textInputField}
          label="Codeforces Username"
          type="text"
          onChange={(e) => setCfId(e.target.value)}
          // required
          fullWidth
          error={errors.cfId.length > 0}
          helperText={errors.cfId}
        />
        <FormHelperText>
          You can register a Codeforces account{" "}
          <PopoutLink to="https://codeforces.com/register">here</PopoutLink>.
        </FormHelperText>

        <Box marginTop={2}>
          {/* Box uses theme.spacing? */}
          <Button type="submit" onClick={handleSubmit}>
            Sign up
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default RegisterPage;
