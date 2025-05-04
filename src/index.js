import _ from 'lodash';
import { parseFile } from './parsers.js';
import buildDiff from './diffBuilder.js';

const buildDiff = (data1, data2) => {
  const keys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));
  
  return keys.map((key) => {
    if (!_.has(data2, key)) {
      return `  - ${key}: ${data1[key]}`;
    }
    if (!_.has(data1, key)) {
      return `  + ${key}: ${data2[key]}`;
    }
    if (_.isEqual(data1[key], data2[key])) {
      return `    ${key}: ${data1[key]}`;
    }
    return [
      `  - ${key}: ${data1[key]}`,
      `  + ${key}: ${data2[key]}`
    ].join('\n');
  }).join('\n');
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);
  return buildDiff(data1, data2, format);
};

export default genDiff;
