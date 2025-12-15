export function computeAgreement(outputs: string[]) {
  if (outputs.length <= 1) {
    return {
      agreementScore: 1.0,
      method: "single-output",
    };
  }

  // naive similarity: length + keyword overlap (PoC, explainable)
  const base = outputs[0];
  let matches = 0;

  for (let i = 1; i < outputs.length; i++) {
    if (outputs[i].substring(0, 30) === base.substring(0, 30)) {
      matches++;
    }
  }

  const agreementScore = matches / (outputs.length - 1);

  return {
    agreementScore,
    method: "prefix-match",
  };
}
