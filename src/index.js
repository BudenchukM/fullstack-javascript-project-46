import { parseFile } from './parsers.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);

  // Временная реализация сравнения - будет улучшена позже
  const diff = {
    file1: data1,
    file2: data2,
    format
  };

  return JSON.stringify(diff, null, 2);
};

export default genDiff;
