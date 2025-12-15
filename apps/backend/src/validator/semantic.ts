function tokenize(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, "")
      .split(" ")
      .filter(Boolean)
  );
}

export function semanticSimilarity(a: string, b: string): number {
  const A = tokenize(a);
  const B = tokenize(b);

  const intersection = new Set([...A].filter(x => B.has(x)));
  const union = new Set([...A, ...B]);

  return union.size === 0 ? 0 : intersection.size / union.size;
}
