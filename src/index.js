import parse from './parsers.js';
import buildDiff from './diffBuilder.js';
import format from './formatters/stylish.js';

export default (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = parse(filepath1);
  const data2 = parse(filepath2);
  const diff = buildDiff(data1, data2);
  
  if (formatName === 'stylish') {
    return format(diff);
  }
  throw new Error(`Unknown format: ${formatName}`);
};
