export const isType = (value, type) => typeof type === 'function'
    ? value instanceof type
    : typeof value === type

export const type = (obj) => Object.prototype.toString.call(obj).replace(/\[object\s|\]/g, '')

export const isArray = (list) => type(list) === 'Array'

export const isString = (list) => type(list) === 'String'