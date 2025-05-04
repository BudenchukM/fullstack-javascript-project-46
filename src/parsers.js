import fs from 'fs';
import path from 'path';
import { readFileSync } from 'fs';
import { parse as parseYaml } from 'yaml';

const readFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const content = fs.readFileSync(fullPath, 'utf-8');
  return content;
};

const parseFile = (filepath) => {
  const content = readFile(filepath);
  const extension = path.extname(filepath).toLowerCase();

  switch (extension) {
    case '.json':
      return JSON.parse(content);
    default:
      throw new Error(`Unsupported file format: ${extension}`);
  }
};

export { parseFile };

const parseJson = (content) => JSON.parse(content);
const parseYml = (content) => parseYaml(content);

const getParser = (extname) => {
  switch (extname) {
    case '.json':
      return parseJson;
    case '.yml':
    case '.yaml':
      return parseYml;
    default:
      throw new Error(`Unsupported format: ${extname}`);
  }
};

export default (filepath) => {
  const content = readFileSync(path.resolve(process.cwd(), filepath), 'utf-8');
  const extension = path.extname(filepath).toLowerCase();
  const parse = getParser(extension);
  return parse(content);
};
