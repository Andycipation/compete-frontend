/*
Inspiration from
https://www.tsmean.com/articles/math/mathjax-parser-for-html-strings/

Very very very hacky. Probably will fail very fast.
*/

import assert from "assert";

interface MathjaxParserConfig {
  // each tuple [string, string] means [opening symbol, closing symbol]
  inlineMath: [string, string][];
  displayMath: [string, string][];
  inlineMathReplacement: [string, string];
  displayMathReplacement: [string, string];
}

// const defaultParserConfig: MathjaxParserConfig = {
//   inlineMath: [
//     ["$", "$"],
//     ["\\(", "\\)"],
//   ],
//   displayMath: [
//     ["$$", "$$"],
//     ["\\[", "\\]"],
//   ],
//   inlineMathReplacement: ["<MyTeX>", "</MyTeX>"],
//   displayMathReplacement: ["<MyTeX block>", "</MyTeX>"],
// };

const defaultParserConfig: MathjaxParserConfig = {
  inlineMath: [
    ["$", "$"],
    ["\\(", "\\)"],
  ],
  displayMath: [
    ["$$", "$$"],
    ["\\[", "\\]"],
  ],
  inlineMathReplacement: ["<MyTeX math={'", "'} />"],
  displayMathReplacement: ["<MyTeX block math={'", "'} />"],
  // inlineMathReplacement: ["<MyTeX math={String.raw`", "`} />"],
  // displayMathReplacement: ["<MyTeX block math={String.raw`", "`} />"],
};

export const parseHtmlAndMathjax = (
  html: string,
  config = defaultParserConfig
): string => {
  // find displayMath delimiters first?
  // console.log("html:", html);
  const len = html.length;

  html = html.replaceAll('src="/', 'src="https://www.acmicpc.net/');
  html = html.replaceAll("\\(", "$");
  html = html.replaceAll("\\)", "$");
  // html.replaceAll("\\[", config.displayMathReplacement[0]);
  // html.replaceAll("\\]", config.displayMathReplacement[1]);

  // console.log("html:", html);

  const dollarSigns = [];
  for (let i = 0; i < len; i++) {
    if (html[i] == "$" && (i == 0 || html[i - 1] != "\\")) {
      // this definitely isn't foolproof but it should work in most cases
      dollarSigns.push(i);
    }
  }
  const count = dollarSigns.length;
  assert(count % 2 == 0);
  const parts = [];
  let last = -1;
  for (let i = 0; i <= count; i += 2) {
    if (i == count) {
      parts.push(html.substr(last + 1));
      break;
    }
    {
      // opening
      const next = dollarSigns[i];
      const text = html.substring(last + 1, next);
      parts.push(text);
      parts.push(config.inlineMathReplacement[0]);
      last = next;
    }
    {
      // closing
      const next = dollarSigns[i + 1];
      let math = html.substring(last + 1, next);
      math = math.replaceAll("&lt;", "<");
      // console.log("math:", math);
      parts.push(math);
      parts.push(config.inlineMathReplacement[1]);
      last = next;
    }
  }

  let result = parts.join("");
  result = result.replaceAll("\\", "\\\\");

  // console.log("mathjax parsed result:", result);

  return result;
};
