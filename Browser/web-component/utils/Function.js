// exception

// recursion

// memoization

// curry

// closure

// scope

// module

// cascade

// callback

// before

// after

export function isNative(value) {
    return typeof value === 'function' && /native code/.test(value.toString())
}

export function delay(fn, ms = 0) {
    return (...params) => () => setTimeout(fn, ms, ...params)
}

// [JS节流和防抖的区分和实现详解](http://caibaojian.com/throttle-debounce.html)
// 首次执行
export function throttle(fn, delay = 100) {
    let last = 0;
    return function() {
        let curr = +new Date();
        if (curr - last > delay) {
            fn.apply(this, arguments);
            last = curr;
        }
    }
}

// 首次不执行
export function debounce(fn, delay = 200) {
    let timer = null;
    return function() {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, arguments);
            timer = null;
        }, delay);
    }
}


// 执行从右向左的函数组合。
// 使用Array.reduce()执行从右向左的函数组合。最后一个 (最右边) 的函数可以接受一个或多个参数;其余的函数必须是一元的。
export function pipe(...fns) {
    return fns.reduce((f, g) => (...args) => f(g(...args)))
}


export function functionName(fn) {
    return fn.name
}

export function promisify(fn) {
    return (...args) => new Promise((resolve, reject) => fn(...args, (err, res) => err ? reject(err) : resolve(res)));
}


export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export function runPromisesInSeries(promises) {
    return promises.reduce((promise, next) => promise.then(next), Promise.resolve());
}

// 链异步函数。
// 循环遍历包含异步事件的函数数组, 当每个异步事件完成时调用next。
export function chainAsync(fns) {
    let curr = 0
    const next = () => fns[curr++](next)
    next();
}
/*
chainAsync([
  next => { console.log('0 seconds'); setTimeout(next, 1000); },
  next => { console.log('1 second');  setTimeout(next, 1000); },
  next => { console.log('2 seconds'); }
])
*/

export function choose(x, y) {
    return (op) => op ? x : y
}

export function noop() {
    
}