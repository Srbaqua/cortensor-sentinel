import { semanticSimilarity } from "./semantic";

export interface PoUWResult {
  pouwScore: number;
  consensusRatio: number;
  outliers: number;
  method: string;
}

export function computePoUW(outputs: string[]): PoUWResult {
  if (outputs.length <= 1) {
    return {
      pouwScore: 1,
      consensusRatio: 1,
      outliers: 0,
      method: "single-output",
    };
  }

  let totalSim = 0;
  let comparisons = 0;
  let outliers = 0;

  for (let i = 0; i < outputs.length; i++) {
    let simSum = 0;

    for (let j = 0; j < outputs.length; j++) {
      if (i !== j) {
        simSum += semanticSimilarity(outputs[i], outputs[j]);
      }
    }

    const avgSim = simSum / (outputs.length - 1);
    totalSim += avgSim;
    comparisons++;

    if (avgSim < 0.4) outliers++;
  }

  const consensusRatio = 1 - outliers / outputs.length;
  const pouwScore = totalSim / comparisons;

  return {
    pouwScore: Number(pouwScore.toFixed(2)),
    consensusRatio: Number(consensusRatio.toFixed(2)),
    outliers,
    method: "semantic-consensus",
  };
}
