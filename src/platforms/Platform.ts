import { PlatformName } from "../common/interfaces/platformName";
import { Sub } from "../common/interfaces/sub";

export interface Platform {
  name: PlatformName;
  getProblemLink: (problemId: string) => string;
  getSubLink: (subId: Sub) => string;
}
