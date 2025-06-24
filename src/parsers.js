import { readFileSync, readdirSync } from 'fs';
import path from 'path';
import { safeLoad } from 'js-yaml';

// Сначала определяем все вспомогательные функции
const parseJson = (content) => JSON.parse(content);
const parseYaml = (content) => safeLoad(content);

const getFileContent = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  
  try {
    return readFileSync(absolutePath, 'utf-8');
  } catch (error) {
    const fixturePath = path.join(process.cwd(), '__fixtures__');
    const files = readdirSync(fixturePath);
    throw new Error(
      `Cannot read file at: ${absolutePath}\n` +
      `Available files in __fixtures__:\n${files.map(f => `- ${f}`).join('\n')}`
    );
  }
};

// Главная функция парсера
const parse = (content, format) => {
  switch (format) {
    case 'json':
      return parseJson(content);
    case 'yml':
    case 'yaml':
      return parseYaml(content);
    default:
      throw new Error(`Unsupported format: ${format}`);
  }
};

// Экспортируемая функция
export default (filepath) => {
  const content = getFileContent(filepath);
  const extension = path.extname(filepath).slice(1);
  return parse(content, extension);
};
