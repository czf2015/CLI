export const memoize = fn => {
    const cache = new Map()
    return value => {
      const cachedResult = cache.get(value)
      if (typeof cachedResult !== 'undefined') return cachedResult
      const result = fn(value)
      cache.set(value, result)
      return result
    }
  }