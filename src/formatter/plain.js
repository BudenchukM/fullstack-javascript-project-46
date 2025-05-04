import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return _.isString(value) ? `'${value}'` : value;
};

const plain = (diffs) => {
  const iter = (tree, parent) => tree.flatMap((node) => {
    const path = [...parent, node.name].join('.');

    switch (node.type) {
      case 'plus':
        return `Property '${path}' was added with value: ${stringify(node.value)}`;
      case 'minus':
        return `Property '${path}' was removed`;
      case 'unchanged':
        return [];
      case 'changed':
        return `Property '${path}' was updated. From ${stringify(node.firstValue)} to ${stringify(node.secondValue)}`;
      case 'subtree':
        return `${iter(node.children, [path]).join('\n')}`;
      default:
        return `Type: ${node.type} is undefined`;
    }
  });

  const plainDiffs = iter(diffs, []);

  return [...plainDiffs].join('\n');
};

export default plain;
