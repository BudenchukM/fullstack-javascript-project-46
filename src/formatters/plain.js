const stringify = (value, depth) => {
  if (typeof value !== 'object' || value === null) {
    return value === null ? 'null' : String(value);
  }

  const indent = ' '.repeat((depth + 1) * 4);
  const lines = Object.entries(value)
    .map(([key, val]) => `${indent}${key}: ${stringify(val, depth + 1)}`);

  return `{\n${lines.join('\n')}\n${' '.repeat(depth * 4)}}`;
};

const formatStylish = (diff, depth = 1) => {
  const indent = ' '.repeat(depth * 4 - 2);
  const bracketIndent = ' '.repeat((depth - 1) * 4);

  const lines = diff.map((node) => {
    switch (node.type) {
      case 'added':
        return `${indent}+ ${node.key}: ${stringify(node.value, depth)}`;
      case 'removed':
        return `${indent}- ${node.key}: ${stringify(node.value, depth)}`;
      case 'unchanged':
        return `${indent}  ${node.key}: ${stringify(node.value, depth)}`;
      case 'changed':
        return [
          `${indent}- ${node.key}: ${stringify(node.oldValue, depth)}`,
          `${indent}+ ${node.key}: ${stringify(node.newValue, depth)}`,
        ].join('\n');
      case 'nested':
        return `${indent}  ${node.key}: ${formatStylish(node.children, depth + 1)}`;
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  });

  return `{\n${lines.join('\n')}\n${bracketIndent}}`;
};

export default formatStylish;
