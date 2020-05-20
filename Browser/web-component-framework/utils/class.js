export const mix = (Parents) => {
    return class Mixin {
        constructor(props) {
            Parents.reduce((instance, Parent) => Object.assign(instance, new Parent(props)), {})
        }
    }
}

let mix1 = (...Parents) => {
    return function Mixin(props) {
        Parents.forEach(Parent => {
            for (let method in Parent.prototype) {
                console.log('--------------------')
                console.log(method)
                this.prototype[method] = Parent.prototype[method]
            }
        })
        return this
    }
}

class People {
    say() {
        console.log("Hello")
    }
}

class Animal {
    walk() {
        console.log("Walk")
    }
}

class Singer {
    sing() {
        console.log("La~")
    }
}

class Lucy extends mix(People, Animal, Singer) {
    sayHi() {
        console.log("I am Lucy")
    }
}

const lucy = new Lucy()
lucy.say() // => Hello
lucy.walk() // => walk
lucy.sing() // => La~
lucy.sayHi() // => I am Lucy


const lock = (fn, duration) => {
    let locked = false
    const unlock = () => locked = false
    return () => {
        if (!locked) {
            locked = true
            setTimeout(() => {
                locked = false
            }, duration)
            return fn(unlock)
        } else {
            console.log('waiting')
        }
    }
}

const sleep = (time) => new Promise((resolve, reject) => {
    setTimeout(() => resolve(), time)
})

const anyFunc = async () => {
    console.log("123") // 输出 123
    await sleep(3000) // 暂停 300 毫秒
    console.log("456") // 输出 456，但是距离上面输出的 123 时间上相隔了 300 毫秒
}

anyFunc()


const combo = (...fns) => (arg) => fns.reverse().reduce((arg, fn) => fn(arg), arg)

const addOne = (a) => a + 1
const multiTwo = (a) => a * 2
const divThree = (a) => a / 3
const toString = (a) => a + ''
const split = (a) => a.split('')

split(toString(addOne(multiTwo(divThree(666)))))
// => ["4", "4", "5"]

const testForCombo = combo(split, toString, addOne, multiTwo, divThree)
testForCombo(666)
// => ["4", "4", "5"]


const convert = (num, radix = 26) => {
    const base = 'A'.charCodeAt(0) - 1
    if (num <= radix) {
        return String.fromCharCode(base + num)
    }
    const s = Math.floor(num / radix)
    const y = num - (Math.floor(num / radix) * radix)
    if (y > 0) {
        return convert(s) + String.fromCharCode(base + y)
    } else {
        return convert(s) + String.fromCharCode(base + radix)
    }
}