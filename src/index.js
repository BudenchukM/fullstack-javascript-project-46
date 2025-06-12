import _ from 'lodash';
import getFileContent from './parsers.js';

const buildDiff = (data1, data2) => {
  const keys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));
  return keys.map((key) => {
    if (!_.has(data2, key)) {
      return { key, value: data1[key], type: 'removed' };
    }
    if (!_.has(data1, key)) {
      return { key, value: data2[key], type: 'added' };
    }
    if (_.isEqual(data1[key], data2[key])) {
      return { key, value: data1[key], type: 'unchanged' };
    }
    return {
      key,
      oldValue: data1[key],
      newValue: data2[key],
      type: 'changed',
    };
  });
};

const formatDiff = (diff) => {
  const lines = diff.map((item) => {
    switch (item.type) {
      case 'added':
        return `  + ${item.key}: ${item.value}`;
      case 'removed':
        return `  - ${item.key}: ${item.value}`;
      case 'changed':
        return [
          `  - ${item.key}: ${item.oldValue}`,
          `  + ${item.key}: ${item.newValue}`,
        ].join('\n');
      default:
        return `    ${item.key}: ${item.value}`;
    }
  });

  return `{\n${lines.join('\n')}\n}`;
};

export default function genDiff(filepath1, filepath2) {
  const data1 = getFileContent(filepath1);
  const data2 = getFileContent(filepath2);
  const diff = buildDiff(data1, data2);
  return formatDiff(diff);
}
