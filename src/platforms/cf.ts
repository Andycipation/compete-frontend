import assert from "assert";
import CfIcon from "../components/cf/CfIcon";
import { Platform } from "./Platform";

export const getContestId = (problemId: string): string | null => {
  const prefixMatch = problemId.match(/^[0-9]+/);
  if (prefixMatch == null) {
    return null;
  }
  assert(prefixMatch.length == 1);
  return prefixMatch[0];
};

const cf: Platform = {
  name: "cf",
  Icon: CfIcon,

  getProblemLink: (problemId: string) => {
    const contestId = getContestId(problemId);
    assert(contestId);
    const problemIndex = problemId.substr(contestId.length);
    // use contest link because then you can check standings?
    // Actually, use problemset link because standings shouldn't matter when
    // practicing problem solving.
    // return `https://codeforces.com/contest/${contestId}/problem/${problemIndex}`;
    return `https://codeforces.com/problemset/problem/${contestId}/${problemIndex}`;
  },

  getSubLink: (sub) => {
    const contestId = getContestId(sub.problemId);
    return `https://codeforces.com/contest/${contestId}/submission/${sub.subId}`;
  },
};

export default cf;
