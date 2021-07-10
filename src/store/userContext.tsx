import React, { createContext, ReactNode, useState } from "react";
import { useQuery } from "react-query";
import axios from "../axiosConfig";
import { LOGGED_OUT_USER, User } from "../interfaces/User";

interface UserContextData {
  user: User;
  handleLogin: (username: string) => Promise<void>;
  handleLogout: () => Promise<void>;
}

const UserContext = createContext<UserContextData>({
  // TODO: fix this "hack"? (is this even a hack?)
  user: LOGGED_OUT_USER,
  handleLogin: async () => {
    console.error("called handleLogin before init");
  },
  handleLogout: async () => {
    console.error("called handleLogout before init");
  },
});

interface Props {
  children: ReactNode;
}

export const UserContextProvider: React.FC<Props> = (props: Props) => {
  const [username, setUsername] = useState("");

  const { data: user } = useQuery(
    ["user", username],
    async () => {
      if (username) {
        const { data: user } = await axios.get<User>(`/user/${username}`);
        // console.log(username, user);
        return user;
      }
      return LOGGED_OUT_USER;
    },
    { initialData: LOGGED_OUT_USER }
  );

  const handleLogin = async (username: string) => {
    // TODO: check lowercase username stuff
    // only do the context-related changes here
    // e.g. no API requests
    setUsername(username.toLowerCase());
  };

  const handleLogout = async () => {
    setUsername("");
  };

  const context: UserContextData = {
    user: user ?? LOGGED_OUT_USER,
    handleLogin,
    handleLogout,
  };

  return (
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
