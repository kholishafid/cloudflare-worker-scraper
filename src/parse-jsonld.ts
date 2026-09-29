type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue }

const escapeControlCharactersInStrings = (value: string) => {
  let result = ''
  let inString = false
  let escaped = false

  for (const character of value) {
    if (escaped) {
      result += character
      escaped = false
      continue
    }

    if (character === '\\' && inString) {
      result += character
      escaped = true
      continue
    }

    if (character === '"') {
      result += character
      inString = !inString
      continue
    }

    if (inString && character.charCodeAt(0) <= 0x1f) {
      result += `\\u${character.charCodeAt(0).toString(16).padStart(4, '0')}`
    } else {
      result += character
    }
  }

  return result
}

const parseJsonLd = (value: string): JSONValue => {
  try {
    return JSON.parse(value)
  } catch {
    try {
      return JSON.parse(escapeControlCharactersInStrings(value))
    } catch {
      // Keep malformed third-party JSON-LD available as its original text.
      return value
    }
  }
}

export { parseJsonLd }
