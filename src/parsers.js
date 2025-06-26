import { load } from 'js-yaml'

const parsers = {
  json: JSON.parse,
  yml: load,
  yaml: load,
}

export default (data, format) => {
  const parser = parsers[format]
  if (!parser) {
    throw new Error(`Unsupported format: ${format}`)
  }

  try {
    return parser(data)
  }
  catch (error) {
    throw new Error(`Failed to parse ${format} data: ${error.message}`)
  }
}
