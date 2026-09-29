import { describe, expect, test } from 'vitest'
import { parseJsonLd } from './parse-jsonld'

describe('parseJsonLd', () => {
  test('parses valid JSON', () => {
    expect(parseJsonLd('{"name":"example"}')).toEqual({ name: 'example' })
  })

  test('escapes raw control characters inside strings', () => {
    expect(parseJsonLd('{"description":"first line\nsecond line"}')).toEqual({
      description: 'first line\nsecond line',
    })
  })

  test('keeps unrecoverable JSON-LD as text', () => {
    const malformed = '{"name":"example}'
    expect(parseJsonLd(malformed)).toBe(malformed)
  })
})
