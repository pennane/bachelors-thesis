type AuthHeader = { scheme: string; value: string }

const deserializeHeader = (header: string): AuthHeader => {
  const delimiterIndex = header.indexOf(' ')
  if (delimiterIndex === -1) {
    throw new Error('Auth header is malformed.')
  }
  return {
    scheme: header.slice(0, delimiterIndex),
    value: header.slice(delimiterIndex)
  }
}

type SchemaValidationOptions = {
  allowedSchemes: string[]
  caseInsensitive: boolean
}

const schemeMatches =
  (opts: SchemaValidationOptions) =>
  (scheme: string): boolean =>
    opts.allowedSchemes.some(
      (s) =>
        s.localeCompare(scheme, undefined, {
          sensitivity: opts.caseInsensitive ? 'accent' : 'variant'
        }) === 0
    )

const validateAuthScheme =
  (opts: SchemaValidationOptions) =>
  (header: AuthHeader): AuthHeader => {
    if (!schemeMatches(opts)(header.scheme)) {
      throw new Error('Unexpected auth scheme')
    }
    return header
  }

const getTokenValue = (header: AuthHeader): string => header.value

const parseAuthTokenFp = pipe([
  deserializeHeader,
  validateAuthScheme({
    allowedSchemes: ['Bearer', 'Access'],
    caseInsensitive: true
  }),
  getTokenValue
])
