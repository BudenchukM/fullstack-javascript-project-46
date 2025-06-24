import { readFileSync, readdirSync } from 'fs';
import path from 'path';
import { safeLoad } from 'js-yaml';

const getFileContent = (filepath) => {
  // Автоматически добавляем __fixtures__ если путь относительный
  const resolvedPath = filepath.startsWith('__fixtures__/') 
    ? filepath 
    : `__fixtures__/${filepath}`;
  
  const absolutePath = path.resolve(process.cwd(), resolvedPath);
  
  try {
    return readFileSync(absolutePath, 'utf-8');
  } catch (error) {
    const fixtureDir = path.join(process.cwd(), '__fixtures__');
    const files = readdirSync(fixtureDir);
    throw new Error(
      `Cannot read file at: ${absolutePath}\n` +
      `Available files in __fixtures__:\n${files.map(f => `- ${f}`).join('\n')}\n` +
      `Try: gendiff __fixtures__/file1.json __fixtures__/file2.json`
    );
  }
};

const parse = (content, format) => {
  switch (format) {
    case 'json': return JSON.parse(content);
    case 'yml':
    case 'yaml': return safeLoad(content);
    default: throw new Error(`Unsupported format: ${format}`);
  }
};

export default (filepath) => {
  const content = getFileContent(filepath);
  const extension = path.extname(filepath).slice(1);
  return parse(content, extension);
};
