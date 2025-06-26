import path from 'path'
import { readFileSync } from 'fs'

export const readFile = (filepath) => {
  const absolutePath = path.isAbsolute(filepath)
    ? filepath
    : path.resolve(process.cwd(), filepath)

  try {
    return readFileSync(absolutePath, 'utf-8')
  }
  catch {
    throw new Error(`Cannot read file at: ${absolutePath}`)
  }
}

export const getFileFormat = (filepath) => {
  const extension = path.extname(filepath).slice(1)
  return extension.toLowerCase()
}
