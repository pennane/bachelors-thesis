## Background

I'm working on my bachelor's thesis at Metropolia UAS in Helsinki, Finland, for a degree in ICT. I love fp, but have faced so much backlash and claims of being too clever. I'm trying to find ways to incorporate fp into non-fp worlds without making people angry!

The working name for the thesis "Evaluating the Pragmatic Application of Functional Programming", which will be released in Finnish only.

Any way, my main interest lies in language-agnostic FP principles that can be blended into non-FP code without relying on heavyweight FP libraries that conflict with the language’s native syntax (mainly js/ts in this case)

#### About reduce

I agree that reduce is not super pleasant. I do also think reduce is a really nice way to inline ad hoc functionality. I've read so much of reduce() (and fold()) that it comes as second nature now.

Of course devs without said experience will not agree. And thats fair.

In actual FP languages, reducing and folding are super nice and powerful due to generalizations with algebraic data structures, but, yeah, that's not the case in JavaScript.

## Questions

Here are some broad-ish questions. Feel free to answer briefly or dive as deep as you want.

1. Is there any hope for FP in the mainstream?

FP is thriving in some languages (Elixir, OCaml), but what about bringing FP concepts to mainstream, non-FP languages? Should we look for other ways to abstract code instead of FP when it's not a natural fit?

2. Thoughts on function composition?

I’m a bit conflicted. I love FP purism, but have seen it not be so nice and forced (with Ramda.js :D)

Do you think composition is the way to go, or are there some other pragmatic alternatives?

3. Thoughts on algebraic data types (ADTs)?

(basically, in ts-land, records and discriminated unions)

```ts
// Example: product type
type Car = { type: 'car'; color: string; seats: number } // Possible members: possible colors * possible seats -> product type
type MotorBike = {
  type: 'motorbike'
  top_speed: number
  wheelieability: number
} // Possible members: possible top_speed * possible wheelieability -> product type

// Example: sum type
type Vehicle = Car | MotorBike // Possible members: possible cars + possible motorcycles -> sum type
```

4. Opinions on Maybe and Result types?

Here’s how I’ve been modeling Maybe and Result types in TypeScript. Have you used similar types, or do you have any opinions on them?

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

5. Implementing Maybe/Result as monads — too much?

What about turning types like Maybe and Result into full-fledged monads? For example:

```ts
const monad = Result.of(mightSayHello())
  .bind(addExclamation)
  .bind(toUpperCase)
  .bind(reverse)

const value = monad.value
// "!DLROW OLLEH" or Error("chili explosion")
```

I find this super elegant. There's no need for if-checks in the bound functions as long as the monad handles errors gracefully. What’s your take on this? Too much abstraction?

The **main** thing I'm interested in is if you see any hope in fp for the mainstream programmer. There are of course great popular languages that do fp and and are loved (such as Elixir or even Ocaml), but what about bringing fp into non-fp languages? Should programmers maybe look for other ways to abstract their code?

I've sensed that big chiefs in the field enjoy the idea of declarative and functional code. As an anecdote, a long standing oop advocate, Christopher Okhravi, was writing a book about OOP but had to start over once realizing that "fp is the obvious way to go"

6. The evolution of programming styles?

In the HTTP 203 episode, "Is .reduce() bad?", you mentioned three stages of a programmer’s journey:

a. Avoiding complex ideas like currying and reduce because they seem intimidating.
b. Using those ideas to feel smart.
c. Writing code like in a beginner’s book.

Has your perspective shifted since then, or have you found more nuances to how you write code now?

## My opinion

I think that the main thing to bring from fp ideas in non-fp languages is to be actually declarative. So for example w
hen modeling problems with ts types it should be cared after that the model never lies! ADTS are super nice.

Also custom function composition (like in the monad example) are super nice. I just hate how much it modifies what the syntax and ideas of the actual non-fp language at hand.
