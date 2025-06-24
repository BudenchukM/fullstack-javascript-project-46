const stringify = (value) => {
  if (typeof value !== 'object' || value === null) {
    return typeof value === 'string' ? `'${value}'` : String(value);
  }
  return '[complex value]';
};

const formatPlain = (diff, path = '') => {
  const lines = diff.flatMap((node) => {
    const currentPath = path ? `${path}.${node.key}` : node.key;
    
    switch (node.type) {
      case 'added':
        return `Property '${currentPath}' was added with value: ${stringify(node.value)}`;
      case 'removed':
        return `Property '${currentPath}' was removed`;
      case 'changed':
        return `Property '${currentPath}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`;
      case 'nested':
        return formatPlain(node.children, currentPath);
      case 'unchanged':
        return [];
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  });

  return lines.join('\n');
};

export default formatPlain;
