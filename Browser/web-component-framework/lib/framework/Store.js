import { format, adapt, deepCopy, keyValue, keyValues } from './utils.js'

// 状态管理
export class Store {
    constructor(state) {
        this.state = {...state}
        this.records = {}
    }
    // 
    dispatch(action, payload) {
        if (typeof payload === 'object') {
            if (Array.isArray(payload)) {
                payload.forEach(item => this.dispatch(action, item))
            } else {
                keyValues(payload).forEach(item => {
                    this[action](item)
                    // switch (item.key) {
                    // case 'suggestion':
                    // case  'initData' :
                    //   this.record(action, item)
                    // }
                })
            }
        } else {
            this[action](payload)
            // switch (payload) {
            // case 'suggestion':
            // case  'initData' :
            //   this.record(action, payload)
            // }
        }
    }
    // 
    set({ key, value }) {
        if (typeof this.state[key] === 'object') {
            this.state[key] = deepCopy(value)
        } else {
            if (typeof this.state[key] === typeof value) {
                this.state[key] = value
            } else {
                throw new Error({
                    name: 'TypeError',
                    message: `${value} is not ${typeof this.state[key]}`,
                    stack: `dispatch('set', ${{ [key]: value }})`
                })
            }
        }
    }
    // 
    reset(key) {
        this.state[key] = this.state[key]
    }
    // 
    step({ key, value }) {
        if (typeof this.state[key] === 'number' && typeof value === 'number') {
            this.state[key] += value
        } else {
            throw new Error({
                name: 'TypeError',
                message: `${key} or ${value} is not number`,
                stack: `dispatch('step', ${{ [key]: value }})`
            })
        }
    }
    // 
    toggle(key) {
        if (typeof this.state[key] === 'boolean') {
            this.state[key] = !this.state[key]
        } else {
            throw new Error({
                name: 'TypeError',
                message: `${key} is not boolean`,
                stack: `dispatch('toggle', ${key})`
            })
        }
    }
    // 
    replace({ key, value }) {
        if (typeof this.state[key] === 'string') {
            this.state[key] = this.state[key].replace(...value)
        } else {
            throw new Error({
                name: 'TypeError',
                message: `${key} is not string`,
                stack: `dispatch('replace', ${{ [key]: value }})`
            })
        }
    }
    // 
    prefix({ key, value }) {
        if (typeof this.state[key] === 'string' && typeof value === 'string') {
            this.state[key] = value.concat(this.state[key])
        } else {
            throw new Error({
                name: 'TypeError',
                message: `${key} or ${value} is not string`,
                stack: `dispatch('prefix', ${{ [key]: value }})`
            })
        }
    }
    // 
    suffix({ key, value }) {
        if (typeof this.state[key] === 'string' && typeof value === 'string') {
            this.state[key] = this.state[key].concat(value)
        } else {
            throw new Error({
                name: 'TypeError',
                message: `${key} or ${value} is not string`,
                stack: `dispatch('suffix', ${{ [key]: value }})`
            })
        }
    }
    // 
    slice({ key, value }) {
        if (typeof this.state[key] === 'string' && typeof value === 'string' ||
            Array.isArray(this.state[key])) {
            if (Array.isArray(value)) {
                this.state[key] = this.state[key].slice(...value)
            } else {
                this.state[key] = this.state[key].slice(value)
            }
        } else {
            throw new Error({
                name: 'TypeError',
                message: `${key} is not string or array`,
                stack: `dispatch('slice', ${{ [key]: value }})`
            })
        }
    }
    // 
    splice({ key, value }) {
        if (Array.isArray(this.state[key])) {
            this.state[key].splice(...value)
        } else {
            throw new Error({
                name: 'TypeError',
                message: `${key} is not array`,
                stack: `dispatch('splice', ${{ [key]: value }})`
            })
        }
    }
    // 
    push({ key, value }) {
        if (Array.isArray(this.state[key])) {
            if (Array.isArray(value)) {
                this.state[key].push(...value)
            } else {
                this.state[key].push(value)
            }
        } else {
            throw new Error({
                name: 'TypeError',
                message: `${key} is not array`,
                stack: `dispatch('push', ${{ [key]: value }})`
            })
        }
    }
    // 
    pop(key) {
        if (Array.isArray(this.state[key])) {
            this.state[key].pop()
        } else {
            throw new Error({
                name: 'TypeError',
                message: `${key} is not array`,
                stack: `dispatch('pop', ${key})`
            })
        }
    }
    // 
    shift(key) {
        if (Array.isArray(this.state[key])) {
            this.state[key].shift()
        } else {
            throw new Error({
                name: 'TypeError',
                message: `${key} is not array`,
                stack: `dispatch('shift', ${key})`
            })
        }
    }
    // 
    unshift({ key, value }) {
        if (Array.isArray(this.state[key])) {
            if (Array.isArray(value)) {
                this.state[key].unshift(...value)
            } else {
                this.state[key].unshift(value)
            }
        } else {
            throw new Error({
                name: 'TypeError',
                message: `${key} is not array`,
                stack: `dispatch('unshift', ${{ [key]: value }})`
            })
        }
    }
    // 
    format({ key, value }) {
        if (typeof this.state[key] === 'object') {
            this.state[key] = format(key, ...value)
        } else {
            throw new Error({
                name: 'TypeError',
                message: `${key} is not object`,
                stack: `dispatch('format', ${{ [key]: value }})`
            })
        }
    }
    // 
    adapt({ key, value }) {
        if (typeof this.state[key] === 'object') {
            this.state[key] = adapt(key, ...value)
        } else {
            throw new Error({
                name: 'TypeError',
                message: `${key} is not object`,
                stack: `dispatch('adapt', ${{ [key]: value }})`
            })
        }
    }
    // 
    append({ key, value }) {
        if (typeof this.state[key] === 'object') {
            this.state[key] = { ...this.state[key], ...value }
        } else {
            throw new Error({
                name: 'TypeError',
                message: `${key} is not object`,
                stack: `dispatch('append', ${{ [key]: value }})`
            })
        }
    }
    // 
    remove({ key, value }) {
        if (typeof this.state[key] === 'object') {
            delete this.state[key][value]
        } else {
            throw new Error({
                name: 'TypeError',
                message: `${key} is not object`,
                stack: `dispatch('remove', ${{ [key]: value }})`
            })
        }
    }
    // 
    record(action, payload) {
        if (action !== 'foreward' && action !== 'backward') {
            const key = keyValue(payload).key || payload
            if (this.records[key]) {
                this.records[key].position++
                this.records[key].sequence.push({ action, payload, [key]: this.state[key] })
            } else {
                this.records[key] = {
                    position: 0,
                    sequence: [{ action, payload, [key]: this.state[key] }],
                }
            }
            console.log(this.records[key])
        }
    }
    // 
    backward(key) {
        if (this.records[key].position > 0) {
            this.state[key] = this.records[key].sequence[--this.records[key].position][key]
        } else {
            console.log('')
        }
    }
    // 
    foreward(key) {
        if (this.records[key].position < this.records[key].sequence.length - 1) {
            this.state[key] = this.records[key].sequence[++this.records[key].position][key]
        } else {
            console.log('')
        }
    }
}
