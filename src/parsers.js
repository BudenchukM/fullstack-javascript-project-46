import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const getFileContent = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const content = fs.readFileSync(absolutePath, 'utf-8');
  const extension = path.extname(filepath).toLowerCase();

  switch (extension) {
    case '.json':
      return JSON.parse(content);
    case '.yml':
    case '.yaml':
      return yaml.load(content);  // Используем метод load вместо parse
    default:
      throw new Error(`Unsupported file format: ${extension}`);
  }
};

export default getFileContent;
