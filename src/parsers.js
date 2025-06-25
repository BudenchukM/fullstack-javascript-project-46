import { readFileSync, readdirSync } from 'fs'
import path from 'path'
import { load } from 'js-yaml' // Заменили safeLoad на load

const getFileContent = (filepath) => {
  const normalizedPath = path.normalize(filepath)

  const absolutePath = path.isAbsolute(normalizedPath)
    ? normalizedPath
    : path.resolve(process.cwd(), normalizedPath)

  try {
    return readFileSync(absolutePath, 'utf-8')
  }
  catch {
    const fixtureDir = path.join(process.cwd(), '__fixtures__')
    try {
      const files = readdirSync(fixtureDir)
      throw new Error(
        `Cannot read file at: ${absolutePath}\n`
        + `Available files in __fixtures__:\n${files.map(f => `- ${f}`).join('\n')}\n`
        + `Try: gendiff __fixtures__/file1.json __fixtures__/file2.json`,
      )
    }
    catch {
      throw new Error(`Cannot read file at: ${absolutePath}\nAlso failed to read __fixtures__ directory`)
    }
  }
}

const parse = (content, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(content)
    case 'yml':
    case 'yaml':
      return load(content) // Используем load вместо safeLoad
    default:
      throw new Error(`Unsupported format: ${format}`)
  }
}

export default (filepath) => {
  const content = getFileContent(filepath)
  const extension = path.extname(filepath).slice(1)
  return parse(content, extension)
}
