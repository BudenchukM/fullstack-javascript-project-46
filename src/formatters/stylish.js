const stringify = (value, depth) => {
  if (typeof value !== 'object' || value === null) {
    return value === null ? 'null' : String(value);
  }

  const indent = ' '.repeat(depth * 4);
  const lines = Object.entries(value)
    .map(([key, val]) => `${indent}    ${key}: ${stringify(val, depth + 1)}`);

  return `{\n${lines.join('\n')}\n${indent}}`;
};

const format = (diff, depth = 1) => {
  const indent = ' '.repeat(depth * 4 - 4);  // Изменено с -2 на -4
  const bracketIndent = ' '.repeat(depth * 4 - 4);  // Добавлено для закрывающей скобки
  
  const lines = diff.map((node) => {
    const currentIndent = ' '.repeat(depth * 4 - 2);  // Для элементов внутри
    switch (node.type) {
      case 'added':
        return `${currentIndent}+ ${node.key}: ${stringify(node.value, depth + 1)}`;
      case 'removed':
        return `${currentIndent}- ${node.key}: ${stringify(node.value, depth + 1)}`;
      case 'unchanged':
        return `${currentIndent}  ${node.key}: ${stringify(node.value, depth + 1)}`;
      case 'changed':
        return [
          `${currentIndent}- ${node.key}: ${stringify(node.oldValue, depth + 1)}`,
          `${currentIndent}+ ${node.key}: ${stringify(node.newValue, depth + 1)}`,
        ].join('\n');
      case 'nested':
        return `${currentIndent}  ${node.key}: ${format(node.children, depth + 1)}`;
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  });

  return `{\n${lines.join('\n')}\n${bracketIndent}}`;
};

export default format;
