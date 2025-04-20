import fs from 'fs';
import path from 'path';

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
    // Добавьте другие форматы по мере необходимости
    default:
      throw new Error(`Unsupported file format: ${extension}`);
  }
};

export { parseFile };
