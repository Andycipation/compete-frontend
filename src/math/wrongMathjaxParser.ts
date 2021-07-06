/*
Modified from:
https://github.com/bersling/mathjax-parser/blob/master/src/mathjax-parser.ts

This doesn't work.
*/

import assert from "assert";

interface ParserResponse {
  outputHtml: string;
}

interface MyRange<T> {
  start: T;
  end: T;
}

interface DelimiterMatch {
  nodeNumber: number;
  index: number;
  isStart: boolean;
  delimiterGroup: DelimiterGroup;
}

interface MathjaxParserConfig {
  inlineMath: [string, string][]; //e.g. [['$','$'],['\\(','\\)']],
  displayMath: [string, string][]; //e.g. [['$$','$$'],['\\[','\\]']],
  inlineMathReplacement: [string, string]; //e.g. ['<span class="inline-math">', '</span>']
  displayMathReplacement: [string, string]; // e.g. ['<span class="display-math">','</span>']
}

const defaultConfig: MathjaxParserConfig = {
  inlineMath: [
    ["$", "$"],
    ["\\(", "\\)"],
  ],
  displayMath: [
    ["$$", "$$"],
    ["\\[", "\\]"],
  ],
  inlineMathReplacement: ["<TeX>", "</TeX>"],
  displayMathReplacement: ["<TeX block>", "</TeX>"],
};

interface DelimiterGroup {
  group: string[];
  type: MathType;
}

interface CurrentState {
  matchedDelimiterSets: MyRange<DelimiterMatch>[];
  lastMatchedGroup?: DelimiterGroup;
}

type MathType = "inline" | "display";

export class MathjaxParser {
  constructor(public config: MathjaxParserConfig = defaultConfig) {}

  parse(inputHtml: string): ParserResponse {
    // create a DOM element in order to use the DOM-Walker
    const body: HTMLElement = document.createElement("body");
    body.innerHTML = inputHtml;

    this.processNodeList(
      body.childNodes,
      this.buildDelimiterArray(this.config)
    );

    return {
      outputHtml: body.innerHTML,
    };
  }

  private buildDelimiterArray(config: MathjaxParserConfig): DelimiterGroup[] {
    const delimiterArray: DelimiterGroup[] = [];

    const insertAtIndex = (
      idx: number,
      delimiterArray: DelimiterGroup[],
      grp: string[],
      type: MathType
    ) => {
      delimiterArray.splice(idx, 0, {
        group: grp,
        type,
      });
    };

    const findIndex = (
      delimiterArray: DelimiterGroup[],
      startDelimiter: string
    ): number => {
      let index = 0;
      for (let i = 0; i < delimiterArray.length; i++) {
        if (startDelimiter.indexOf(delimiterArray[i].group[0]) > -1) {
          break;
        }
        ++index;
      }
      return index;
    };

    config.inlineMath.forEach((grp) => {
      const idx = findIndex(delimiterArray, grp[0]);
      insertAtIndex(idx, delimiterArray, grp, "inline");
    });
    config.displayMath.forEach((grp) => {
      const idx = findIndex(delimiterArray, grp[0]);
      insertAtIndex(idx, delimiterArray, grp, "display");
    });
    return delimiterArray;
  }

  private processNodeList(
    nodeList: NodeList,
    delimiterArray: DelimiterGroup[]
  ) {
    const allAdjacentTextOrBrNodes: MyRange<number>[] =
      this.findAdjacentTextOrBrNodes(nodeList);

    allAdjacentTextOrBrNodes.forEach((textOrBrNodeSet: MyRange<number>) => {
      this.iterateMath(delimiterArray, textOrBrNodeSet, nodeList);
    });

    //process children
    for (let i = 0; i < nodeList.length; i++) {
      const node: Node = nodeList[i];

      // only need to process non-text nodes
      if (node.nodeType !== 3) {
        this.processNodeList(node.childNodes, delimiterArray);
      }
    }
  }

  private isMatchingIndex(
    text: string,
    idx: number,
    delimiter: string
  ): boolean {
    return text.substr(idx, delimiter.length) === delimiter;
  }

  private iterateMath(
    delimiterArray: DelimiterGroup[],
    textOrBrNodeSet: MyRange<number>,
    nodeList: NodeList
  ) {
    //Iterate through all delimiters, trying to find matching delimiters
    const state: CurrentState = {
      matchedDelimiterSets: [],
    };

    for (
      let nodeNumber = textOrBrNodeSet.start;
      nodeNumber < textOrBrNodeSet.end;
      nodeNumber++
    ) {
      const node: Node = nodeList[nodeNumber];

      //for the text nodes (type 3), other nodes don't matter
      if (node.nodeType === 3) {
        const textContent = node.textContent as string;

        //check every index if matches a delimiter group
        this.processIndices(textContent, state, delimiterArray, nodeNumber);
      }
    }

    this.cleanOccurrences(state.matchedDelimiterSets);

    //REPLACE ALL MATCHED DELIMITERS WITH REPLACEMENTS
    this.replaceMatches(state.matchedDelimiterSets, nodeList);
  }

  private replaceMatches(
    matchedDelimiterSets: MyRange<DelimiterMatch>[],
    nodeList: NodeList
  ) {
    matchedDelimiterSets = matchedDelimiterSets.reverse(); // work the array back to from so indexes don't get messed up
    matchedDelimiterSets.forEach((delimiterSet: MyRange<DelimiterMatch>) => {
      this.replaceStartAndEndOfMatchedSet(delimiterSet, nodeList);
    });
  }

  private processIndices(
    textContent: string,
    state: CurrentState,
    delimiterArray: DelimiterGroup[],
    nodeNumber: number
  ) {
    let idx = 0;
    while (idx < textContent.length) {
      // if all occurrences of delimiters so far are closed
      // (i.e. have 'end') and we're looking for a new opening delimiter
      if (
        state.matchedDelimiterSets.length === 0 ||
        state.matchedDelimiterSets[state.matchedDelimiterSets.length - 1].end
      ) {
        let isMatch = false;
        delimiterArray.some((delimiterGroup) => {
          if (this.isMatchingIndex(textContent, idx, delimiterGroup.group[0])) {
            state.lastMatchedGroup = delimiterGroup;
            //TODO: correct escapes for $ special case...
            MathjaxParser.pushStart(
              state.matchedDelimiterSets,
              nodeNumber,
              idx,
              delimiterGroup
            );
            isMatch = true;
            return true;
          }
        });
        if (isMatch) {
          idx += state.lastMatchedGroup!.group[0].length;
        } else {
          ++idx;
        }
      }

      //if start matched, but end not matched yet
      else {
        if (
          this.isMatchingIndex(
            textContent,
            idx,
            state.lastMatchedGroup!.group[1]
          )
        ) {
          MathjaxParser.pushEnd(
            state.matchedDelimiterSets,
            nodeNumber,
            idx,
            state.lastMatchedGroup!
          );
          idx += state.lastMatchedGroup!.group[1].length;
        } else {
          ++idx;
        }
      }
    }
  }

  private replaceStartAndEndOfMatchedSet = (
    delimiterSet: MyRange<DelimiterMatch>,
    nodeList: NodeList
  ) => {
    //handle end FIRST
    this.replaceDelimiters(nodeList, delimiterSet.end);

    //handle start
    this.replaceDelimiters(nodeList, delimiterSet.start);
  };

  private cleanOccurrences = (occurrences: MyRange<DelimiterMatch>[]) => {
    if (occurrences.length > 0) {
      if (!occurrences[occurrences.length - 1].end) {
        occurrences.pop();
      }
    }
  };

  private replaceDelimiters = (
    nodeList: NodeList,
    delimiterMatch: DelimiterMatch
  ) => {
    const oldDelimiterLength = delimiterMatch.isStart
      ? delimiterMatch.delimiterGroup.group[0].length
      : delimiterMatch.delimiterGroup.group[1].length;

    const nodeVal = nodeList[delimiterMatch.nodeNumber].nodeValue;
    assert(nodeVal);

    //insert the new delimiter while removing the old delimiter
    const replacements =
      delimiterMatch.delimiterGroup.type == "display"
        ? this.config.displayMathReplacement
        : this.config.inlineMathReplacement;
    nodeList[delimiterMatch.nodeNumber].nodeValue =
      // string start
      nodeVal.substr(0, delimiterMatch.index) +
      // replacement string
      replacements[delimiterMatch.isStart ? 0 : 1] +
      // string rest
      nodeVal.substr(
        delimiterMatch.index + oldDelimiterLength,
        nodeVal.length - 1
      );
  };

  private static pushStart(
    matchedDelimiterSets: MyRange<DelimiterMatch>[],
    nodeNumber: number,
    idx: number,
    delimiterGroup: DelimiterGroup
  ) {
    matchedDelimiterSets.push({
      start: {
        nodeNumber,
        index: idx,
        delimiterGroup,
        isStart: true,
      },
      end: {
        // this is a throwaway object?
        nodeNumber: -1,
        index: -1,
        delimiterGroup: {
          group: [],
          type: "inline",
        },
        isStart: false,
      },
    });
  }

  private static pushEnd(
    matchedDelimiterSets: MyRange<DelimiterMatch>[],
    nodeNumber: number,
    idx: number,
    delimiterGroup: DelimiterGroup
  ) {
    matchedDelimiterSets[matchedDelimiterSets.length - 1].end = {
      nodeNumber,
      index: idx,
      delimiterGroup,
      isStart: false,
    };
  }

  private findAdjacentTextOrBrNodes = (
    nodeList: NodeList
  ): MyRange<number>[] => {
    //value true if node is textOrBr, false otherwise
    //example:
    // hello <br> world <span>bla</span>
    // would yield
    // [true, true, true, false]
    const textOrBrNodes: boolean[] = [];
    for (let i = 0; i < nodeList.length; i++) {
      const node: Node = nodeList[i];
      this.isTextOrBrNode(node)
        ? textOrBrNodes.push(true)
        : textOrBrNodes.push(false);
    }

    //get array with ranges (arrays) of adjacentTextOrBrNodes
    //example:
    // hello <br> world <span>bla</span> that's cool
    // would yield
    // [{start: 0, end: 3}, {start: 4, end: 5}]
    const adjacentTextOrBrNodes: MyRange<number>[] = [];
    for (let i = 0; i < textOrBrNodes.length; i++) {
      const isTextOrBrNode: boolean = textOrBrNodes[i];

      if (isTextOrBrNode) {
        //handle case if IS NOT ADJACENT MATCH: insert new array
        if (
          adjacentTextOrBrNodes.length === 0 ||
          adjacentTextOrBrNodes[adjacentTextOrBrNodes.length - 1].end !== i
        ) {
          adjacentTextOrBrNodes.push({
            start: i,
            end: i + 1,
          });
        }
        //handle case if IS ADJACENT MATCH: raise value by one
        else if (
          adjacentTextOrBrNodes[adjacentTextOrBrNodes.length - 1].end === i
        ) {
          ++adjacentTextOrBrNodes[adjacentTextOrBrNodes.length - 1].end;
        }
      }
    }
    return adjacentTextOrBrNodes;
  };

  private isTextOrBrNode = (node: Node) => {
    return node.nodeType === 3 || node.nodeName === "BR";
  };
}
