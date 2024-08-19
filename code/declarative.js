const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const isOdd = (n) => n % 2 !== 0
const double = (n) => n * 2

const pickOddsDoubled = (xs) => xs.filter(isOdd).map(double)

console.log(pickOddsDoubled(numbers)) // [2, 6, 10, 14, 18]
