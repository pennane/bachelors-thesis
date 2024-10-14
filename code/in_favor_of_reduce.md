## Background

I'm writing a bachelor's thesis at Metropolia UAS Helsinki, Finland for ICT B.A. I love fp, but have faced so much backlash and claims of being too clever that I'm trying to find ways to incorporate fp into non-fp worlds without making everyone angry.

The working name for the thesis "Evaluating the Pragmatic Application of Functional Programming", which will be released in Finnish only.

Any way, I'm looking for language agnostic things about fp that can be integrated into non-fp code without incorporating a heavy fp-library that differs heavily from the actual language syntax at hand. I'm working mainly in js/ts.

#### About reduce

I do kind of agree that reduce is mostly bad, but also I think its really nice way to inline ad hoc functionality. I've read so much of reduce() (and fold()) that it comes as second nature now. (Of course that is not the case for super fresh developers). Folding and reducing make lots of sense in fp languages where the implementations are super generalized with algebraic datastructures, but yeah, thats not the case in js.

## Questions

I tried to come up with some broad-ish questions which can be skipped or answered in as brief or wide manner.

The **main** thing I'm interested in is if you see any hope in fp for the mainstream programmer. There are of course great popular languages that do fp and and are loved (such as Elixir or even Ocaml), but what about bringing fp into non-fp languages? Should programmers maybe look for other ways to abstract their code?

I've sensed that big chiefs in the field enjoy the idea of declarative and functional code. As an anecdote, a long standing oop advocate, Christopher Okhravi, was writing a book about OOP but had to start over once realizing that "fp is the obvious way to go"

### Any opinions on function composition?

Personally, I'm torn. I love functional nonsense, but at work I've had countless counterarguments against it. (and while we use fp in ts with Ramda.js, it seems like a too forced way to do fp in js/ts)

### Do you have an opinion or do you use algebraic data types?

(basically, in ts-land, records and discriminated unions)

```ts
// Possible members: possible colors * possible seats -> product type
type Car = { type: 'car'; color: string; seats: number }

// Possible members: possible top_speed * possible wheelieability -> product type
type MotorBike = {
  type: 'motorbike'
  top_speed: number
  wheelieability: number
}
```

```ts
// Possible members: possible cars + possible motorcycles -> sum type
type Vehicle = Car | MotorBike
```

### Do you use or have opinions on Maybe-types or Record-types?

```ts
type Just<T> = { value: T }
type Nothing = { type: 'nothing' }
type Maybe<T> = Just<T> | Nothing

type Success<T> = { value: T }
type Failure = { error: Error }
type Result<T> = Success<T> | Failure

const mightSayHello = (): Result<string> => {
  if (Math.random() > 0.5) {
    return { error: new Error('chili explosion') }
  }
  return { value: 'hello world' }
}
```

### What about implementing said types (Maybe, and Record) as monads?

```ts
const monad = Result.of(mightSayHello())
  .bind(addExclamation)
  .bind(toUpperCase)
  .bind(reverse)

const value = monad.value
// either "!DLROW OLLEH" or Error("chili explosion")
// futher specifics maybe not too relevant (?)
```

(In my opinion this is way too sweet. There does not need to be any if checks in the specific functions bound to the Result monad granted that the monad implementation returns an error as soon as it notices one.)

### Finally

In the http 203 episode "is .reduce() bad?" you anecdotally mentioned that you'd been in three stages of being a programmer.

1.  Not using complex ideas like currying, reducing or whatever as they were intimidating
2.  Using complex ideas to appear cool
3.  Wanting to write code like in a beginners book

Has anything changed relating to this? Or have you found more nuances on how you wish to write code?
