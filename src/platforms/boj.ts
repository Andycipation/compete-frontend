import BojIcon from "../components/boj/BojIcon";
import { Platform } from "./Platform";

const boj: Platform = {
  name: "boj",
  Icon: BojIcon,

  getProblemLink: (problemId: string): string => {
    return `https://www.acmicpc.net/problem/${problemId}`;
  },

  getSubLink: (sub) => {
    // this is private for most people
    return `https://www.acmicpc.net/source/${sub.subId}`;
  },
};

export default boj;
