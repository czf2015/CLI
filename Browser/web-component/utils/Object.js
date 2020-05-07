export function copy(obj) {
    let result = obj
    if (typeof obj === 'object') {
        if (Array.isArray(obj)) {
            result = [...obj]
        }
        result = {...obj }
    }
    return result
}

export function deepCopy(oldObj) {
    // const list = {}

    // return function deepCopy(oldObj) {
    //     list.push(oldObj)

    //     const newObj = Array.isArray(oldObj) ? [] : {}

    //     for (const key in oldObj) {
    //         if (oldObj.hasOwnProperty(key)) {
    //             if (typeof oldObj[key] === 'object') {
    //                 if (list.find(item => item === oldObj[key])) {
    //                     console.log(`{ ${key}: [Circular] }`)
    //                     newObj[key] = oldObj[key]
    //                 } else {
    //                     newObj[key] = deepCopy(oldObj[key])
    //                 }
    //             } else {
    //                 newObj[key] = oldObj[key]
    //             }
    //         }
    //     }

    //     return newObj
    // }(oldObj)
    return JSON.parse(JSON.stringify(oldObj))
}

export function equal(a, b) {
    let result = true
    if (typeof a !== 'object') {
        result = typeof b !== 'object' && a === b
    } else {
        if (Array.isArray(a)) {
            if (Array.isArray(b)) {
                if (a.length === b.length) {
                    a.forEach((item, idx) => {
                        if (!equal(item, b[idx])) {
                            result = false
                        }
                    })
                } else {
                    result = false
                }
            } else {
                result = false
            }
        } else {
            if (typeof b === 'object') {
                if (Object.keys(a).length === Object.keys(b).length) {
                    Object.keys(a).forEach(key => {
                        if (!equal(a[key], b[key])) {
                            result = false
                        }
                    })
                } else {
                    result = false
                }
            } else {
                result = false
            }
        }
    }
    return result
}

// export function extend(obj, props) {
//     for (var i in props) obj[i] = props[i];
//     return obj;
// }

export function mixin(target, source) {
    for (let key in source) {
        target[key] = source[key]
    }
}

export function filter(origin, entries) {
    const r = {}
    for (let key in origin) {
        const entry = entries[key] // boolean | string
        if (typeof entry === 'string') {
            if (origin[key][entry]) {
                Object.assign(r, origin[key][entry])
            }
        } else {
            if (entry) {
                Object.assign(r, origin[key])
            }
        }
    }
    return r
}