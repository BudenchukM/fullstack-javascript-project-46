import { readFileSync } from 'fs';
import path from 'path';

const getFileContent = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  return readFileSync(absolutePath, 'utf-8');
};

const parse = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    
    default:
      throw new Error(`Unsupported format: ${format}`);
  }
};

export const getParsedData = (filepath) => {
  const content = getFileContent(filepath);
  const format = path.extname(filepath).slice(1);
  return parse(content, format);
};
