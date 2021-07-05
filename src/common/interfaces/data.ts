export interface User {
  username: string;
  bojId: string;
}

// change this to metadata?
export type Problem = {
  id: string;
  title: string;
  tier: number;
  // numSolved: number;
  // numSubs: number;
  // fractionSolved: number;
};

export type ProblemForUser = {
  problem: Problem;
  forUser: string;
  solved: boolean;
};

export type ProblemData = {
  metadata: Problem;
  statement: string; // use base64 encoding for compression?
};
