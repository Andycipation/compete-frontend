import assert from "assert";
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

  getProblemLink: (problemId: string) => {
    const contestId = getContestId(problemId);
    assert(contestId);
    const problemIndex = problemId.substr(contestId.length);
    // TODO: use problem set or contest link?
    return `https://codeforces.com/problemset/problem/${contestId}/${problemIndex}`;
  },

  getSubLink: (sub) => {
    const contestId = getContestId(sub.problemId);
    return `https://codeforces.com/contest/${contestId}/submission/${sub.subId}`;
  },
};

export default cf;
