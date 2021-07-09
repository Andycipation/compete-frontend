/*
TODO: implement password update;
server should revoke refresh token and access token
*/

import React, { FormEvent, useContext, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import axios from "../axiosConfig";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@material-ui/core";

import UserContext from "../store/userContext";
import { UpdateFields } from "../common/interfaces/requests";
import { useFormStyles } from "./formStyles";
import { getAccessToken } from "../store/accessToken";

const EditProfilePage: React.FC = () => {
  const history = useHistory();
  const userContext = useContext(UserContext);
  const classes = useFormStyles();

  const [bojId, setBojId] = useState(userContext.bojId);
  const [cfId, setCfId] = useState(userContext.cfId);

  const [submitted, setSubmitted] = useState(false);

  const [errors, setErrors] = useState<UpdateFields>({
    bojId: "",
    cfId: "",
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (submitted) {
      return;
    }
    setSubmitted(true);
    // it is okay to send passwords over HTTPS
    const data: UpdateFields = {
      bojId,
      cfId,
    };
    try {
      const username = userContext.username;
      await axios.put("/user-info", {
        accessToken: getAccessToken(),
        ...data,
      });
      await userContext.handleLogout();
      await userContext.handleLogin(username);
      history.push("/");
    } catch (err) {
      console.log(err.response.status);
      const errors: UpdateFields = err.response.data.errors;
      setErrors(errors);
      setSubmitted(false);
    }
  };

  if (!userContext.username) {
    // something went very wrong with ProtectedRoute lol
    return <Redirect to="/" />;
  }

  return (
    <Container maxWidth="xs">
      <Typography variant="h5">Edit Profile: {userContext.username}</Typography>
      <Typography variant="body2">
        Note that these handles are for tracking which problems you have solved;
        the recommendations are linked to your Compete account with username{" "}
        {userContext.username}.
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          className={classes.textInputField}
          label="BOJ Handle"
          type="text"
          defaultValue={userContext.bojId}
          onChange={(e) => setBojId(e.target.value)}
          // required
          fullWidth
          error={errors.bojId.length > 0}
          helperText={errors.bojId}
        />
        <TextField
          className={classes.textInputField}
          label="Codeforces Handle"
          type="text"
          defaultValue={userContext.cfId}
          onChange={(e) => setCfId(e.target.value)}
          // required
          fullWidth
          error={errors.cfId.length > 0}
          helperText={errors.cfId}
        />
        <Box marginTop={2}>
          {/* Box uses theme.spacing? */}
          <Button type="submit" onClick={handleSubmit} disabled={submitted}>
            Update information
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default EditProfilePage;
