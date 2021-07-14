import React, { createContext, ReactNode, useState } from "react";
import { useQuery } from "react-query";

import axios from "../axiosConfig";
import jwt from "jsonwebtoken";

import { RefreshTokenResponse } from "../common/interfaces/requests";
import { LOGGED_OUT_USER, User } from "../interfaces/User";
import { setAccessToken } from "./accessToken";

interface UserContextData {
  isLoading: boolean;
  user: User;
  handleLogin: (username: string) => Promise<void>;
  handleLogout: () => Promise<void>;
}

const UserContext = createContext<UserContextData>({
  // TODO: fix this "hack"? (is this even a hack?)
  isLoading: true,
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

interface AccessTokenPayload {
  iat: number; // issued at
  exp: number; // expiry time
  username: string;
}

export const UserContextProvider: React.FC<Props> = (props: Props) => {
  const [username, setUsername] = useState("");

  const { data: user, isLoading } = useQuery(
    ["user", username],
    async () => {
      const res = await axios.post<RefreshTokenResponse>("/refresh-token");
      const { ok, accessToken } = res.data;
      if (ok) {
        setAccessToken(accessToken);
        const payload = jwt.decode(accessToken) as AccessTokenPayload;
        await handleLogin(payload.username);
        const { data: user } = await axios.get<User>(
          `/user/${payload.username}`
        );
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
    isLoading,
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
