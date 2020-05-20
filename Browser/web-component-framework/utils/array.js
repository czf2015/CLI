export const slice = (arrayLike, index) => Array.prototype.slice.call(arrayLike, index)

export const each = (array, fn) => {
    for (var i = 0, len = array.length; i < len; i++) {
        fn(array[i], i)
    }
}

export const toArray = (listLike) => {
    if (!listLike) {
        return []
    }

    const list = []

    for (var i = 0, len = listLike.length; i < len; i++) {
        list.push(listLike[i])
    }

    return list
}
