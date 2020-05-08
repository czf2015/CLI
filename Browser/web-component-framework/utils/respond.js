export default (method = 'GET', Model, list) => (params) => {
    const res = {
        statusCode: 200,
        errMsg: '',
        data: list
    }

    const h = (handle, params) => Array.isArray(params) ? params.map(handle) : handle(params)

    try {
        switch(method) {
            case 'POST':
                if (typeof params === 'object') {
                    h(params => {
                        const value = {...Model, ...params}
                        const valid = Object.keys(value).length == Object.keys(Model).length
                                    && Object.keys(value).every(key => typeof value[key] === typeof Model[key])
                        if (valid) {
                            list.push(value)
                        } else {
                            throw({code: 400, message: 'params error'})
                        }
                    }, params)
                } else {
                    throw({code: 400, message: `${params} is not object`})
                }
                break
            case 'DELETE':
                if (typeof params !== 'undefined') {
                        if (typeof params === 'object') {
                            h(params => list = list.fliter(item => item.id != params.id), params)
                        } else {
                            throw({code: 400, message: `${params} is not object`})
                        }
                } else {
                    list = [] // delete all
                }
                break
            case 'PUT':
                if (typeof params === 'object') {
                    h(params => {
                        const value = {...Model, ...params, modifiedAt: Date.now()}
                        const valid = Object.keys(value).length == Object.keys(Model).length
                                    && Object.keys(value).every(key => typeof value[key] === typeof Model[key])
                        if (valid) {
                            list = list.map(item => item.id == params.id ? value : item)
                        } else {
                            throw({code: 400, message: 'params error'})
                        }
                    }, params)
                } else {
                    throw({code: 400, message: `${params} is not object`})
                }
                break
            case 'PATCH':
                if (typeof params === 'object') {
                    h(params => list = list.map(item => {
                        const value = {...item, ...params, modifiedAt: Date.now()}
                        const valid = Object.keys(value).length == Object.keys(Model).length
                                    && Object.keys(value).every(key => typeof value[key] === typeof Model[key])
                        if (valid) {
                            item.id == params.id ? value : item
                        } else {
                            throw({code: 400, message: 'params error'})
                        }
                    }, params))
                } else {
                    throw({code: 400, message: `${params} is not object`})
                }
                break
            default:
                if (typeof params !== 'undefined') {
                    if (typeof params === 'object') {
                        res.data = h(params => list.find(item => Object.keys(params).every(key => item[key] === params[key])), params)
                    } else {
                        throw({code: 400, message: `${params} is not object`})
                    }
                }
        }
    } catch(e) {
        res.statusCode = e.code || 500
        res.errMsg = e.message || JSON.stringify(e)
    }

    return Promise.resolve(res)
}
