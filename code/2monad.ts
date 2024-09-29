type AuthHeader = { scheme: string; value: string }

type SchemaValidationOptions = {
  allowedSchemes: string[]
  caseInsensitive: boolean
}

type Success<T> = { type: 'success'; value: T }
type Failure = { type: 'failure'; error: Error }
type Result<T> = Success<T> | Failure

const chain =
  <A, B>(f: (x: A) => Result<B>) =>
  (x: Result<A>): Result<B> => {
    if (x.type === 'failure') return x
    return f(x.value)
  }

const unwrap = <T>(x: Result<T>): T => {
  if (x.type === 'failure') throw x.error
  return x.value
}

const success = <T>(value: T): Success<T> => ({ type: 'success', value })
const failure = (error: string): Failure => ({
  type: 'failure',
  error: new Error(error)
})

const deserializeHeader = (header: string): Result<AuthHeader> => {
  const delimiterIndex = header.indexOf(' ')
  if (delimiterIndex === -1) return failure('Auth header is malformed.')
  return success({
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
      return failure('Unexpected auth scheme')
    }
    return success(header)
  }

const getValue = (header: AuthHeader): Result<string> => success(header.value)

const parseAuthTokenFp = pipe([
  deserializeHeader,
  chain(
    validateScheme({
      allowedSchemes: ['Bearer', 'Access'],
      caseInsensitive: true
    })
  ),
  chain(getValue),
  unwrap
])

export const a = parseAuthTokenFp
