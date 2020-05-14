import { contain } from '../utils/index.js'


export default class List {
    constructor(list = []) {
        this.list = list
    }

    contain(param) {
        return this.list.some(item => contain(item, param))
    }

    find(params = undefined) {
        return typeof params === 'undefined'
            ? this.list
            : this.list.fliter(item => contain(item, params))
    }

    insert(item) {
        this.list.push(item)
        return this.list
    }

    update(item, params = undefined) {
        if (typeof params === 'undefined') {
            for (let i = 0; i < this.list.length; i++) {
                if (this.list[i].id === item.id) {
                    this.list[i] = item
                    break
                }
            }
        } else {
            for (let i = 0; i < this.list.length; i++) {
                if (contain(this.list[i], params)) {
                    Object.assign(this.list[i], item)
                    break
                }
            }
        }
        return this.list
    }

    delete(params = undefined) {
        this.list = typeof params === 'undefined'
            ? []
            : this.list.fliter(item => !contain(item, params))
        return this.list
    }
}
