import React, { createContext, ReactNode, useState } from "react";

interface UserContextData {
  username: string;
  handleLogin: (username: string) => Promise<void>;
  handleLogout: () => Promise<void>;
}

const UserContext = createContext<UserContextData>({
  // TODO: fix this "hack"? (is this even a hack?)
  username: "n/a",
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
