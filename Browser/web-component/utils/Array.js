
const { equal } = require('./Object')

export function remove(arr, value) {
    return arr.filter(item => !equal(item, value))
}

export function counter(arr) {
    const store = {}
    arr.forEach(item => {
        if (typeof store[item] === 'undefined') {
            store[item] = 1
        } else {
            store[item] += 1
        }
    })
    return store
}
// console.log({counter: counter(['x', 'y', 'z', 'x'])})

// export function most(arr) { }

export function count(arr, value) {
    return arr.filter(item => equal(item, value)).length
}

export function counts(arr, values) {
    return values.map(value => count(arr, value))
}

export function contain(arr, value) {
    return count(arr, value) > 0
}

export function dict([key, value]) {
    return { [key]: value }
}
// console.log(dict(['test', 1]))

export function dicts(arrs) {
    return arrs.reduce((a, b) => ({ ...a, ...dict(b) }), {})
}

export function table(arr) {
    const result = []
    for (let i = 0; i < arr.length; i += 2) {
        result.push([arr[i], arr[i + 1]])
    }
    return result
}

// console.log(dicts([['k1', 1], ['k2', 2]]))

export function devide(arr, num = 2) {
    const rows = []
    const len = arr.length
    for (let i = 0; i < len; i += num) {
        const cols = []
        for (let j = 0; j < num; j++) {
            if (i + j < len) {
                cols.push(arr[i + j])
            } else {
                break
            }
        }
        rows.push(cols)
    }
    return rows
}


export function removeItem(item, arr) {
    if (arr) for (var i = 0, len = arr.length; i < len; i++) if (arr[i] === item) {
        arr.splice(i, 1);
        break;
    }
}