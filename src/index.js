import fs from 'fs';
import path from 'path';
import { formatData } from './formatter/stylish.js';
import parsers from './parsers.js';
import searchDiff from './search.js';

function transferPathToFileContent(filepath) {
  const getAbsolutePath = () => path.resolve(process.cwd(), filepath);

  if (!fs.existsSync(getAbsolutePath(filepath))) {
    return `File does not exist at the specified path ${filepath}`;
  }

  const fileContent = fs.readFileSync(getAbsolutePath(filepath), 'utf-8');
  const fileExtension = path.extname(getAbsolutePath(filepath));

  return parsers(fileContent, fileExtension);
}

function genDiff(filepath1, filepath2, format = 'stylish') {
  const data1 = transferPathToFileContent(filepath1);
  const data2 = transferPathToFileContent(filepath2);

  const diff = searchDiff(data1, data2);
  const formattedDiff = formatData(diff, format);
  return formattedDiff;
}

export default genDiff;
