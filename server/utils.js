
'use strict'

const randomInRange = (from, to) => Math.floor(Math.random() * (to - from)) + from
const randomDate = (start, end) => (
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
)

const generateExampleEntries = (size) => {
  const data = []
  let i = 0
  while (i < size) {
    data.push({
      id: i,
      date: randomDate(new Date(2016, 1, 1), new Date()),
      amount: randomInRange(10, 10000),
      type: ['e', 'i'][randomInRange(0, 2)],
      categoryId: randomInRange(1, 3),
    })
    i++
  }
  return data
}

module.exports = {
  randomInRange,
  randomDate,
  generateExampleEntries,
}
