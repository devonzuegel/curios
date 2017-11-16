/**
 * Convert to lower case, remove accents, remove non-word chars and
 * replace spaces with the specified delimeter.
 * Does not split camelCase text.
 */
export const slugify = (str: string, delimeter: string = '-') => {
  str = replaceAccents(str)
  str = removeNonWord(str)
  str = trim(str) // Should come after removeNonWord
    .replace(/ +/g, delimeter) // Replace spaces with delimeter
    .toLowerCase()

  return str
}

/**
 * Remove non-word chars.
 */
export const removeNonWord = (str: string) =>
  str.replace(/[^0-9a-zA-Z\xC0-\xFF \-]/g, '')

/**
 * Replaces all accented chars with regular ones
 */
export const replaceAccents = (str: string) => {
  // Verifies if the String has accents and replace them
  if (str.search(/[\xC0-\xFF]/g) > -1) {
    str = str
      .replace(/[\xC0-\xC5]/g, 'A')
      .replace(/[\xC6]/g, 'AE')
      .replace(/[\xC7]/g, 'C')
      .replace(/[\xC8-\xCB]/g, 'E')
      .replace(/[\xCC-\xCF]/g, 'I')
      .replace(/[\xD0]/g, 'D')
      .replace(/[\xD1]/g, 'N')
      .replace(/[\xD2-\xD6\xD8]/g, 'O')
      .replace(/[\xD9-\xDC]/g, 'U')
      .replace(/[\xDD]/g, 'Y')
      .replace(/[\xDE]/g, 'P')
      .replace(/[\xE0-\xE5]/g, 'a')
      .replace(/[\xE6]/g, 'ae')
      .replace(/[\xE7]/g, 'c')
      .replace(/[\xE8-\xEB]/g, 'e')
      .replace(/[\xEC-\xEF]/g, 'i')
      .replace(/[\xF1]/g, 'n')
      .replace(/[\xF2-\xF6\xF8]/g, 'o')
      .replace(/[\xF9-\xFC]/g, 'u')
      .replace(/[\xFE]/g, 'p')
      .replace(/[\xFD\xFF]/g, 'y')
  }

  return str
}

const WHITE_SPACES = [
  ' ',
  '\n',
  '\r',
  '\t',
  '\f',
  '\v',
  '\u00A0',
  '\u1680',
  '\u180E',
  '\u2000',
  '\u2001',
  '\u2002',
  '\u2003',
  '\u2004',
  '\u2005',
  '\u2006',
  '\u2007',
  '\u2008',
  '\u2009',
  '\u200A',
  '\u2028',
  '\u2029',
  '\u202F',
  '\u205F',
  '\u3000',
]

/**
 * Remove chars from beginning of string.
 */
export const ltrim = (str: string, chars: string[] = WHITE_SPACES) => {
  var start = 0,
    len = str.length,
    charLen = chars.length,
    found = true,
    i,
    c

  while (found && start < len) {
    found = false
    i = -1
    c = str.charAt(start)

    while (++i < charLen) {
      if (c === chars[i]) {
        found = true
        start++
        break
      }
    }
  }

  return start >= len ? '' : str.substr(start, len)
}

/**
 * Remove chars from end of string.
 */
export const rtrim = (str: string, chars: string[] = WHITE_SPACES) => {
  var end = str.length - 1,
    charLen = chars.length,
    found = true,
    i,
    c

  while (found && end >= 0) {
    found = false
    i = -1
    c = str.charAt(end)

    while (++i < charLen) {
      if (c === chars[i]) {
        found = true
        end--
        break
      }
    }
  }

  return end >= 0 ? str.substring(0, end + 1) : ''
}

/**
 * Remove white-spaces from beginning and end of string.
 */
export const trim = (str: string, chars: string[] = WHITE_SPACES) =>
  ltrim(rtrim(str, chars), chars)
