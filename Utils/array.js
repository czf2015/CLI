const math = (method) => (arr, accessor) => Math[method].apply(null, (accessor ? arr.map(accessor) : arr))

export const min = math('min')

export const max = math('max')

export const range = arr => [min(arr), max(arr)]

export const floor = math('floor')

export const sum = arr => arr.reduce((a, b) => a + b, 0)

export const mean = arr => sum(arr) / arr.length

let result = range([132.1, 13.1, 42.3], x => x % 50)
console.log(result)