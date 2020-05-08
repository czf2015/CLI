export function cutStr(str, maxLen, remains = '') {
    let j = 0
    for (let i = 0; i < str.length; i++) {
        j += /[x00-xff]/.test(str[i]) ? 1 : 2
        if (j > maxLen) {
            return str.slice(0, i) + remains
        }
    }
    return str
}


export function removeRepeat(str, separate = ' ') {
    return [...new Set(str.split(separate))].join(separate)
}


export function count(text, word) {
    return text.split(word).length - 1
}


export function counts(text, words) {
    return words.map((word) => count(text, word))
}


export function capitalize(str) {
    return str.replace(/^[a-z]/, c => c.toUpperCase())
}


export function camelize(str) {
    return str.replace(/[_-](\w)/g, (_, $1) => $1 ? $1.toUpperCase() : '')
}

export function camelCase(str) {
    return str.replace(/-(\w)/g, (_, $1) => $1.toUpperCase());
}

export function hyphenate(str) {
    return str.replace(/\B(A-Z)/g, '-$1').toLowerCase()
}

// console.log(str.match(/[\u0000-\u00ff]/g))     //半角   
// console.log(str.match(/[\u4e00-\u9fa5]/g))     //中文   
// console.log(str.match(/[\uff00-\uffff]/g))     //全角  


export function hasChinese(str) {
    return str.search(/[\u4e00-\u9fa5]/g) !== -1
}


export function getRealLength(str) {
    let result = str.length

    for (let i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 128) {
            result++
        }
    }

    return result
}

export function repeat(str, n) {
    let res = '';
    while (n) {
        if (n % 2 === 1) {
            res += str;
        }
        if (n > 1) {
            str += str;
        }
        n >>= 1;
    }
    return res
}

export function reverse(str) {
    return str.split('').reverse().join('')
}

// 下划线转换驼峰
export function toHump(name) {
    return name.replace(/_(\w)/g, (all, letter) => letter.toUpperCase())
}

// 驼峰转换下划线
export function toLine(name) {
    return name.replace(/([A-Z])/g, "_$1").toLowerCase()
}
