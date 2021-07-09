import React from "react";
import { useHistory } from "react-router-dom";
import axios from "../axiosConfig";

import { Container, List, ListItem, Typography } from "@material-ui/core";
import { useQuery } from "react-query";
import { User } from "../common/interfaces/data";

const UsersPage: React.FC = () => {
  const history = useHistory();

  const { data: users, isLoading } = useQuery(["getUsers"], async () => {
    const { data } = await axios.get<User[]>("/users");
    return data;
  });

  if (!users || isLoading) {
    return <Typography variant="body1">loading users...</Typography>;
  }

  // TODO: implement
  return (
    <Container>
      <Typography variant="h5">Users</Typography>
      <List>
        {users.map((user: User) => {
          return (
            <ListItem
              key={user.username}
              button
              onClick={() => {
                history.push(`/user/${user.username}`);
              }}
            >
              <Typography>{user.username}</Typography>
            </ListItem>
          );
        })}
      </List>
    </Container>
  );
};

export default UsersPage;
