type AuthHeader = { scheme: string; value: string }

type SchemaValidationOptions = {
  allowedSchemes: string[]
  caseInsensitive: boolean
}

type Success<T> = { type: 'success'; value: T }
type Failure = { type: 'failure'; error: Error }
type Result<T> = Success<T> | Failure

const bind =
  <A, B>(f: (x: A) => Result<B>) =>
  (x: Result<A>): Result<B> => {
    if (x.type === 'failure') return x
    return f(x.value)
  }

const unwrap = <T>(x: Result<T>): T => {
  if (x.type === 'failure') throw x.error
  return x.value
}

const successOf = <T>(value: T): Success<T> => ({ type: 'success', value })
const failureOf = (error: string): Failure => ({
  type: 'failure',
  error: new Error(error)
})

const deserializeHeader = (header: string): Result<AuthHeader> => {
  const delimiterIndex = header.indexOf(' ')
  if (delimiterIndex === -1) return failureOf('Auth header is malformed.')
  return successOf({
    scheme: header.slice(0, delimiterIndex),
    value: header.slice(delimiterIndex)
  })
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

const validateScheme =
  (opts: SchemaValidationOptions) =>
  (header: AuthHeader): Result<AuthHeader> => {
    if (!schemeMatches(opts)(header.scheme)) {
      return failureOf('Unexpected auth scheme')
    }
    return successOf(header)
  }

const getValue = (header: AuthHeader): Result<string> => successOf(header.value)

const parseAuthTokenFp = pipe([
  deserializeHeader,
  bind(
    validateScheme({
      allowedSchemes: ['Bearer', 'Access'],
      caseInsensitive: true
    })
  ),
  bind(getValue),
  unwrap
])

export const a = parseAuthTokenFp
