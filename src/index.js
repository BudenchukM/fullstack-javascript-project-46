import parse from './parsers.js';
import buildDiff from './diffBuilder.js';
import getFormatter from '../formatters/index.js';


export default (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = parse(filepath1);
  const data2 = parse(filepath2);
  const diff = buildDiff(data1, data2);
  const format = getFormatter(formatName);
  switch (format) {
    case 'plain':
      return formatPlain(diff);
    case 'json':
      return formatJson(diff);
    case 'stylish':
    default:
      return formatStylish(diff);
  }
};
