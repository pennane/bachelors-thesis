const parseAuthToken = (header: string): string => {
  const delimiterIndex = header.indexOf(' ')

  if (delimiterIndex === -1) throw new Error('Auth header is malformed.')

  const authScheme = header.slice(0, delimiterIndex)

  if (authScheme !== 'Bearer') throw new Error('Unexpected auth scheme')

  const tokenValue = header.slice(delimiterIndex)

  return tokenValue
}

const parseAuthToken2 = (scheme: string, header: string): string | null => {
  const delimiterIndex = header.indexOf(' ')

  if (delimiterIndex === -1) throw new Error('Auth header is malformed.')

  const authScheme = header.slice(0, delimiterIndex)

  if (authScheme !== scheme) throw new Error('Unexpected auth scheme')

  const tokenValue = header.slice(delimiterIndex)

  return tokenValue
}

const parseAuthToken3 = (
  scheme: string,
  header: string,
  caseInsensitive: boolean
): string | null => {
  const delimiterIndex = header.indexOf(' ')

  if (delimiterIndex === -1) throw new Error('Auth header is malformed.')

  const authScheme = header.slice(0, delimiterIndex)

  if (caseInsensitive && authScheme.toLowerCase() !== scheme.toLowerCase()) {
    throw new Error('Unexpected auth scheme')
  }

  if (!caseInsensitive && authScheme !== scheme) {
    throw new Error('Unexpected auth scheme')
  }

  const tokenValue = header.slice(delimiterIndex)

  return tokenValue
}

const parseAuthToken4 = (
  schemes: string[],
  header: string,
  caseInsensitive: boolean
): string | null => {
  const delimiterIndex = header.indexOf(' ')

  if (delimiterIndex === -1) throw new Error('Auth header is malformed.')

  const authScheme = header.slice(0, delimiterIndex)

  if (
    !schemes.some((scheme) =>
      caseInsensitive
        ? scheme.toLowerCase() === authScheme.toLowerCase()
        : scheme === authScheme
    )
  ) {
    throw new Error('Unexpected auth scheme')
  }

  const tokenValue = header.slice(delimiterIndex)

  if (!tokenValue) return null

  return tokenValue
}
