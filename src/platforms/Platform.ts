import React from "react";
import { PlatformName } from "../common/interfaces/platformName";
import { Sub } from "../common/interfaces/sub";

export interface Platform {
  name: PlatformName;
  Icon: React.FC;
  getProblemLink: (problemId: string) => string;
  getSubLink: (subId: Sub) => string;
}
