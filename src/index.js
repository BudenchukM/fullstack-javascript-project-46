import parse from './parsers.js'
import buildDiff from './diffBuilder.js'
import getFormatter from './formatters/index.js'
import { readFile, getFileFormat } from './fileReader.js'

export default (filepath1, filepath2, formatName = 'stylish') => {
  if (typeof formatName !== 'string') {
    throw new Error(`Format name must be a string, received: ${typeof formatName}`)
  }
  const formatter = getFormatter(formatName)
  const content1 = readFile(filepath1)
  const format1 = getFileFormat(filepath1)
  const data1 = parse(content1, format1)
  const content2 = readFile(filepath2)
  const format2 = getFileFormat(filepath2)
  const data2 = parse(content2, format2)
  const diff = buildDiff(data1, data2)
  return formatter(diff)
}
