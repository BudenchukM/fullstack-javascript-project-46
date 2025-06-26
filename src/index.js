import parse from './parsers.js'
import buildDiff from './diffBuilder.js'
import getFormatter from './formatters/index.js'

export default (filepath1, filepath2, formatName = 'stylish') => {
  if (typeof formatName !== 'string') {
    throw new Error(`Format name must be a string, received: ${typeof formatName}`)
  }
  const formatter = getFormatter(formatName)
  const data1 = parse(filepath1)
  const data2 = parse(filepath2)
  const diff = buildDiff(data1, data2)
  return formatter(diff)
}
