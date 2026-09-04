const variablePattern = /\{\{\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*\}\}/g;

export const getTextVariables = (text = '') => {
  const variables = [];
  const seen = new Set();
  let match;

  while ((match = variablePattern.exec(text)) !== null) {
    const variable = match[1];
    if (!seen.has(variable)) {
      seen.add(variable);
      variables.push(variable);
    }
  }

  return variables;
};

export const getTextDimensions = (text = '') => {
  const lines = text.split('\n');
  const longestLineLength = Math.max(...lines.map((line) => line.length), 0);
  const width = Math.min(440, Math.max(220, longestLineLength * 7 + 54));
  const charactersPerLine = Math.max(1, Math.floor((width - 42) / 7));
  const visualLineCount = lines.reduce(
    (count, line) => count + Math.max(1, Math.ceil(line.length / charactersPerLine)),
    0,
  );
  const height = Math.min(190, Math.max(44, visualLineCount * 20 + 14));

  return { width, height };
};