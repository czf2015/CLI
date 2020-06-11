export const deepCopy = (oldObj) => {
    const list = []

    return function deepCopy(oldObj) {
        list.push(oldObj)

        const newObj = Array.isArray(oldObj) ? [] : {}

        for (const key in oldObj) {
            if (oldObj.hasOwnProperty(key)) {
                if (typeof oldObj[key] === 'object') {
                    if (list.find(item => item === oldObj[key])) {
                        console.log(`{ ${key}: [Circular] }`)
                        newObj[key] = oldObj[key]
                    } else {
                        newObj[key] = deepCopy(oldObj[key])
                    }
                } else {
                    newObj[key] = oldObj[key]
                }
            }
        }

        return newObj
    }(oldObj)
}

export const keyValues = (obj) =>
    Object.keys(obj).map(key => ({ key, value: obj[key] }))

export const keyValue = (raw) =>
    typeof raw === 'object' ? keyValues(raw)[0] : raw

export const format = (raw, fields, convert) => {
    const list = {}

    return function format(raw, fields, convert) {
        fields.forEach(field => {
            if (typeof list[field] === 'undefined') {
                list[field] = [raw]
            } else {
                list[field].push(raw)
            }
            for (const key in raw) {
                if (typeof raw[key] === 'object') {
                    if (Array.isArray(raw[key])) {
                        raw[key].forEach(item => item = format(item, [field], convert))
                    } else {
                        if (list[field].find(item => item === raw[key])) {
                            console.log(`{ ${key}: [Circular] }`)
                        } else {
                            raw[key] = format(raw[key], [field], convert)
                        }
                    }
                } else {
                    if (key === field) {
                        raw[key] = convert(raw[key])
                    }
                }
            }
        })

        return raw
    }(raw, fields, convert)
}


export const adapt = (raw, transform) => {
    const list = []

    return function adapt(raw, transform) {
        list.push(raw)

        if (Array.isArray(raw)) {
            raw.forEach(item => item = adapt(item, transform))
        } else {
            Object.keys(raw).forEach(oldKey => {
                const newKey = transform[oldKey] || oldKey

                if (newKey !== oldKey) {
                    raw[newKey] = raw[oldKey]
                    delete raw[oldKey]
                }

                if (typeof raw[newKey] === 'object') {
                    if (list.find(item => item === raw[newKey])) {
                        console.log(`{ ${newKey}: [Circular] }`)
                    } else {
                        raw[newKey] = adapt(raw[newKey], transform)
                    }
                }
            })
        }

        return raw
    }(raw, transform)
}

export const contain = (source, target) => Object.keys(target)
    .every(key => source[key] === target[key])


export const isEqual = (a, b) => {
    // 类型为基本类型时,如果相同,则返回true
    if (a === b) return true
    if (typeof a === 'object' && typeof b === 'object' && Object.keys(a).length === Object.keys(b).length) {
        // 类型为对象并且元素个数相同
        // 遍历所有对象中所有属性, 判断元素是否相同
        for (const key in a) {
            if (a.hasOwnProperty(key)) {
                if (!eq(a[key], b[key])) {
                    // 对象中具有不相同属性 返回false
                    return false
                }
            }
        }
    } else if (Array.isArray(a) && Array.isArray(b) && a.length === b.length) {
        // 类型为数组并且数组长度相同
        for (let i = 0; i < a.length; i++) {
            if (!eq(a[i], b[i])) {
                // 如果数组元素中具有不相同元素, 返回false
                return false
            }
        }
    } else {
        // 其它类型, 均返回false
        return false
    }
    // 走到这里, 说明数组或者对象中所有元素都相同, 返回true
    return true
}