import React from "react";
import { Typography } from "@material-ui/core";

import JsxParser from "react-jsx-parser";
import "katex/dist/katex.min.css";
import TeX from "@matejmazur/react-katex";
import { parseHtmlAndMathjax } from "../../mathjaxParser";

// use this as a "middleman" for debugging purposes
// note that mathjaxParser.ts replaces stuff with MyTeX, so
// don't try to "simplify" by removing this component
// this design is bad but it works for now
const MyTeX: React.FC = (props) => {
  // console.log("MyTeX props:", props);
  return <TeX {...props} />;
};

interface ProblemSectionProps {
  heading: string;
  htmlWithMathjax: string;
}

const ProblemSection: React.FC<ProblemSectionProps> = (
  props: ProblemSectionProps
) => {
  return (
    <div>
      <Typography variant="h1">{props.heading}</Typography>
      <Typography component="div" variant="body1">
        {/* use <div> as the root element to avoid an error where a <p> is nested
        inside of the root <p> tag */}
        <JsxParser
          components={{ MyTeX }}
          jsx={parseHtmlAndMathjax(props.htmlWithMathjax)}
          autoCloseVoidElements
          showWarnings
        />
      </Typography>
    </div>
  );
};

export default ProblemSection;
