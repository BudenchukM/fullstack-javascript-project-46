import { readFileSync, readdirSync } from 'fs';
import path from 'path';
import { safeLoad } from 'js-yaml';

const getFileContent = (filepath) => {
  // Нормализуем путь (убираем лишние слеши и т.д.)
  const normalizedPath = path.normalize(filepath);
  
  // Определяем абсолютный путь
  const absolutePath = path.isAbsolute(normalizedPath)
    ? normalizedPath
    : path.resolve(process.cwd(), normalizedPath);

  try {
    return readFileSync(absolutePath, 'utf-8');
  } catch (error) {
    // Если файл не найден, показываем доступные файлы в фикстурах
    const fixtureDir = path.join(process.cwd(), '__fixtures__');
    try {
      const files = readdirSync(fixtureDir);
      throw new Error(
        `Cannot read file at: ${absolutePath}\n` +
        `Available files in __fixtures__:\n${files.map(f => `- ${f}`).join('\n')}\n` +
        `Try: gendiff __fixtures__/file1.json __fixtures__/file2.json`
      );
    } catch (dirError) {
      throw new Error(`Cannot read file at: ${absolutePath}\nAlso failed to read __fixtures__ directory`);
    }
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
