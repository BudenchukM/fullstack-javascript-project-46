import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const getFileContent = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const content = fs.readFileSync(absolutePath, 'utf-8');
  return JSON.parse(content);
};

const buildDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const sortedKeys = _.sortBy(_.union(keys1, keys2));

  return sortedKeys.map((key) => {
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
