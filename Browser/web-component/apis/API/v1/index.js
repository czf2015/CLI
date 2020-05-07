const h = (handle, params) => Array.isArray(params) ? params.map(handle) : handle(params)


export default class {
    constructor(Model, list = []) {
        this.Model = Model
        this.list = list
    }

    // @params undefined | Array | Object
    GET(params) {
        const res = {
            statusCode: 200,
            errMsg: '',
            data: this.list
        }
        if (typeof params !== 'undefined') {
            try {
                if (typeof params === 'object') {
                    res.data = h(params => this.list.find(item => Object.keys(params).every(key => item[key] === params[key])), params)
                } else {
                    throw({code: 400, message: `${params} is not object`})
                }
            } catch(e) {
                res.statusCode = e.code || 500
                res.errMsg = e.message || JSON.stringify(e)
            }
        }
        return Promise.resolve(res)
    }

    // @params Array | Object
    POST(params) {
        const res = {
            statusCode: 200,
            errMsg: '',
            data: this.list
        }
        try {
            if (typeof params === 'object') {
                h(params => {
                    const value = {...this.Model, ...params}
                    const valid = Object.keys(value).length == Object.keys(this.Model).length
                                && Object.keys(value).every(key => typeof value[key] === typeof this.Model[key])
                    if (valid) {
                        this.list.push(value)
                    } else {
                        throw({code: 400, message: 'params error'})
                    }
                }, params)
            } else {
                throw({code: 400, message: `${params} is not object`})
            }
        } catch(e) {
            res.statusCode = e.code || 500
            res.errMsg = e.message || JSON.stringify(e)
        }
        return Promise.resolve(res)
    }

    // @params undefined | Array | Object
    DELETE(params) {
        const res = {
            statusCode: 200,
            errMsg: '',
            data: this.list
        }
        if (typeof params !== 'undefined') {
            try {
                if (typeof params === 'object') {
                    h(params => this.list = this.list.fliter(item => item.id != params.id), params)
                } else {
                    throw({code: 400, message: `${params} is not object`})
                }
            } catch(e) {
                res.statusCode = e.code || 500
                res.errMsg = e.message || JSON.stringify(e)
            }
        } else {
            this.list = [] // delete all
        }
        return Promise.resolve(res)
    }

    // @params Array | Object
    PUT(params) {
        const res = {
            statusCode: 200,
            errMsg: '',
            data: this.list
        }
        try {
            if (typeof params === 'object') {
                h(params => {
                    const value = {...this.Model, ...params, modifiedAt: Date.now()}
                    const valid = Object.keys(value).length == Object.keys(this.Model).length
                                && Object.keys(value).every(key => typeof value[key] === typeof this.Model[key])
                    if (valid) {
                        this.list = this.list.map(item => item.id == params.id ? value : item)
                    } else {
                        throw({code: 400, message: 'params error'})
                    }
                }, params)
            } else {
                throw({code: 400, message: `${params} is not object`})
            }
        } catch(e) {
            res.statusCode = e.code || 500
            res.errMsg = e.message || JSON.stringify(e)
        }
        return Promise.resolve(res)
    }
    
    // @params Array | Object
    PATCH(params) {
        const res = {
            statusCode: 200,
            errMsg: '',
            data: this.list
        }
        try {
            if (typeof params === 'object') {
                h(params => this.list = this.list.map(item => {
                    const value = {...item, ...params, modifiedAt: Date.now()}
                    const valid = Object.keys(value).length == Object.keys(this.Model).length
                                && Object.keys(value).every(key => typeof value[key] === typeof this.Model[key])
                    if (valid) {
                        item.id == params.id ? value : item
                    } else {
                        throw({code: 400, message: 'params error'})
                    }
                }, params))
            } else {
                throw({code: 400, message: `${params} is not object`})
            }
        } catch(e) {
            res.statusCode = e.code || 500
            res.errMsg = e.message || JSON.stringify(e)
        }
        return Promise.resolve(res)
    }
}