/*
Not used yet.
*/

import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Typography } from "@material-ui/core";

import htmlReactParser from "html-react-parser";
import axios from "../axiosConfig";

import { FullProblem } from "../common/interfaces/data";
import TierBadge from "../components/TierBadge";

import PopoutLink from "../components/PopoutLink";

const bojProblemLink = (id: string) => {
  return `https://www.acmicpc.net/problem/${id}`;
};

interface Props {
  showTier?: boolean;
}

const ProblemPage: React.FC<Props> = (props: Props) => {
  const { id } = useParams<{ id: string }>();

  const {
    data: problem,
    isLoading,
    isError,
  } = useQuery(["getProblem", id], async () => {
    const { data } = await axios.get<FullProblem>(`/problem/${id}`);
    console.log(data);
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
      <Typography variant="body2">
        <PopoutLink to={bojProblemLink(problem.id)}>external link</PopoutLink>
      </Typography>
      {/* <Typography variant="h5">Problem Statement</Typography> */}
      <Typography variant="body1">
        {htmlReactParser(problem.statementHtml)}
      </Typography>
    </div>
  );
};

export default ProblemPage;
