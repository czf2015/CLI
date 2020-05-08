function cutStr(str, max) {
    if (str.length > max) {
        return cutStr(str.slice(0, -1), max)
    } else {
        return str
    }
}

module.exports = {
    cutStr,
}