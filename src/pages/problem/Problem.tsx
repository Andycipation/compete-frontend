/*
Not used yet.
*/

import React from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Container, Typography } from "@material-ui/core";

import ProblemSection from "./ProblemSection";

import axios from "../../axiosConfig";

import { FullProblem } from "../../common/interfaces/problem";
import TierBadge from "../../components/boj/TierBadge";

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
    const { data } = await axios.get<FullProblem>(`/boj/problem/${id}`);
    return data;
  });

  if (isLoading) {
    return <Typography>loading problem data...</Typography>;
  }

  if (!problem || isError) {
    return (
      <Typography>
        An error occurred and the problem {id} cannot be fetched at this time.
      </Typography>
    );
  }

  return (
    <Container>
      <Helmet>
        <title>
          Problem {id} &mdash; {problem.title}
        </title>
      </Helmet>
      {props.showTier && <TierBadge tier={problem.difficulty} />}
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
        htmlWithMathjax={problem.statementHtml}
      />
      <ProblemSection
        heading="Input Specification"
        htmlWithMathjax={problem.inputSpecHtml}
      />
      <ProblemSection
        heading="Output Specification"
        htmlWithMathjax={problem.outputSpecHtml}
      />
    </Container>
  );
};

export default ProblemPage;
