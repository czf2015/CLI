export const isType = (value, type) => typeof type === 'function'
    ? value instanceof type
    : typeof value === type