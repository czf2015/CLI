export function add(...nums) {
    return nums.reduce((total, num) => total + num, 0)
}


export function mult(...nums) {
    return nums.reduce((acc, num) => acc * num, 1)
}


export function approxEqual(n1, n2, epsilon = 0.0001) {
    return Math.abs(n1 - n2) < epsilon
}

// 位数
export function digit(x, y = 10) {
    let pos = 1
    let val = y

    while (val < x) {
        val *= y
        pos++
    }

    return pos
}

export function format(x, y) {
    return String(10 ** y+ x).slice(1)
}


// export function min(arr) {
    
// }
// Math.min

// export function max(arr) {

// }
// Math.max

// mean 均值

// median 中位数

// quantile 百分位数

// variance 方差

// devariance 标准差
