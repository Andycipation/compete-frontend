import React, { createContext, ReactNode, useState } from "react";
import { useQuery } from "react-query";
import axios from "../axiosConfig";

interface UserContextData {
  username: string;
  bojId: string;
  cfId: string;
  handleLogin: (username: string) => Promise<void>;
  handleLogout: () => Promise<void>;
}

const UserContext = createContext<UserContextData>({
  // TODO: fix this "hack"? (is this even a hack?)
  username: "N/A",
  bojId: "N/A",
  cfId: "N/A",
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

const LOGGED_OUT_DATA = {
  boj: { userId: "" },
  cf: { userId: "" },
};

export const UserContextProvider: React.FC<Props> = (props: Props) => {
  const [username, setUsername] = useState("");

  const { data: user } = useQuery(
    ["user", username],
    async () => {
      if (username) {
        const { data: user } = await axios.get(`/user/${username}`);
        // console.log(username, user);
        return user;
      }
      return LOGGED_OUT_DATA;
    },
    { initialData: LOGGED_OUT_DATA }
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

  const context = {
    username,
    bojId: user.boj.userId,
    cfId: user.cf.userId,
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
