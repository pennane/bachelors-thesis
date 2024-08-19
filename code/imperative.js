const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]

function pickOddsDoubled(xs) {
  const result = []
  for (let i = 0; i < xs.length; i++) {
    if (xs[i] % 2 !== 0) {
      result.push(xs[i] * 2)
    }
  }
  return result
}

console.log(pickOddsDoubled(numbers)) // [2, 6, 10, 14, 18]
