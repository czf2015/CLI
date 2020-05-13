import { isType, execute, List } from './utils.js'


export class API extends List {
    constructor(Model, list = []) {
        super(list)
        this.Model = Model
    }

    /* private */validate(params) {
        const value = { ...this.Model, ...params }
        return Object.keys(value).length == Object.keys(this.Model).length
            && Object.keys(params).every(key => isType(params[key], this.Model[key]))
    }

    /* private */respond(params, handler) {
        const res = {
            statusCode: 200,
            errMsg: '',
            data: this.list
        }
        if (typeof params !== 'undefined') {
            try {
                if (typeof params === 'object') {
                    handler(res)
                } else {
                    throw ({ code: 400, message: `${params} is not object` })
                }
            } catch (e) {
                res.statusCode = e.code || 500
                res.errMsg = e.message || JSON.stringify(e)
            }
        }
        return res
    }

    // @params undefined | Array | Object
    async get(params) {
        const handler = res => res.data = execute(this.list.find, params)
        return this.respond(params, handler)
    }

    // @params Array | Object
    async post(params) {
        const handler = (res) => {
            execute(params => {
                if (this.validate(params)) {
                    this.list.insert({ ...this.Model, ...params, createdAt: Date.now(), modifiedAt: Date.now() })
                } else {
                    throw ({ code: 400, message: 'params error' })
                }
            }, params)
        }
        return this.respond(params, handler)
    }

    // @params Array | Object
    async put(params) {
        const handler = (res) => {
            execute(params => {
                if (this.validate(params)) {
                    this.list.update({ ...params.item || params, modifiedAt: Date.now() }, params.params)
                } else {
                    throw ({ code: 400, message: 'params error' })
                }
            }, params)
        }
        return this.respond(params, handler)
    }

    // @params Array | Object
    async patch(params) {
        return this.put(params)
    }

    // @params undefined | Array | Object
    async delete(params) {
        const handler = (res) => execute(this.list.delete, params)
        return this.respond(params, handler)
    }
}