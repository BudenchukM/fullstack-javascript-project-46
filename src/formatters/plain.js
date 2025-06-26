const stringify = (value) => {
  if (typeof value !== 'object' || value === null) {
    return typeof value === 'string' ? `'${value}'` : String(value)
  }
  return '[complex value]'
}

const nodeHandlers = {
  added: (node, currentPath) =>
    `Property '${currentPath}' was added with value: ${stringify(node.value)}`,

  removed: (node, currentPath) =>
    `Property '${currentPath}' was removed`,

  changed: (node, currentPath) =>
    `Property '${currentPath}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`,

  nested: (node, currentPath) =>
    formatPlain(node.children, currentPath),

  unchanged: () => [],
}

const formatPlain = (diff, path = '') => {
  const lines = diff.flatMap((node) => {
    const currentPath = path ? `${path}.${node.key}` : node.key
    const handler = nodeHandlers[node.type]

    if (!handler) {
      throw new Error(`Unknown node type: ${node.type}`)
    }

    return handler(node, currentPath)
  })

  return lines.join('\n')
}

export default formatPlain
