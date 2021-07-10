/*
keep this separate from the backend "IUser" interface because
this is the actual data that gets selected from the database
and sent to the front-end
*/

export interface User {
  username: string;

  boj: {
    userId: string;
    levels: number[];
  };
  cf: {
    userId: string;
    levels: number[];
  };

  tokenVersion: number;
  createdAt: Date;
  updatedAt: Date;
}

export const LOGGED_OUT_USER: User = {
  username: "",
  boj: {
    userId: "",
    levels: [],
  },
  cf: {
    userId: "",
    levels: [],
  },
  tokenVersion: -1,
  createdAt: new Date(0),
  updatedAt: new Date(0),
};
