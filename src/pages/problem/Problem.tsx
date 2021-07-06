/*
Not used yet.
*/

import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Typography } from "@material-ui/core";

import ProblemSection from "./ProblemSection";

import axios from "../../axiosConfig";

import { FullProblem } from "../../common/interfaces/data";
import TierBadge from "../../components/TierBadge";

import PopoutLink from "../../components/PopoutLink";

const bojProblemLink = (id: string) => {
  return `https://www.acmicpc.net/problem/${id}`;
};

const bojSubmitLink = (id: string) => {
  return `https://www.acmicpc.net/submit/${id}`;
};

interface ProblemPageProps {
  showTier?: boolean;
}

const ProblemPage: React.FC<ProblemPageProps> = (props: ProblemPageProps) => {
  const { id } = useParams<{ id: string }>();

  const {
    data: problem,
    isLoading,
    isError,
  } = useQuery(["getProblem", id], async () => {
    const { data } = await axios.get<FullProblem>(`/problem/${id}`);
    return data;
  });

  if (isLoading) {
    return (
      <div>
        <Typography>loading problem data...</Typography>
      </div>
    );
  }

  if (!problem || isError) {
    return (
      <div>
        <Typography>
          An error occurred and the problem {id} cannot be fetched at this time.
        </Typography>
      </div>
    );
  }

  return (
    <div>
      {props.showTier && <TierBadge tier={problem.tier} />}
      <Typography variant="h4">{problem.title}</Typography>
      <Typography variant="subtitle2">Problem {problem.id}</Typography>

      {/* external links */}
      <Typography variant="body2">
        <PopoutLink to={bojProblemLink(problem.id)}>
          View problem {problem.id} on BOJ
        </PopoutLink>
      </Typography>
      <Typography variant="body2">
        <PopoutLink to={bojSubmitLink(problem.id)}>
          Submit to problem {problem.id} on BOJ
        </PopoutLink>
      </Typography>

      <ProblemSection
        heading="Problem Statement"
        html={problem.statementHtml}
      />
      <ProblemSection
        heading="Input Specification"
        html={problem.inputSpecHtml}
      />
      <ProblemSection
        heading="Output Specification"
        html={problem.outputSpecHtml}
      />
    </div>
  );
};

export default ProblemPage;
