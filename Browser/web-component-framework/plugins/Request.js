import { integrate } from '../utils/index.js'

const params = (data, options) => {
    return options ? options : { body: JSON.stringify(data) }
}

// 请求
export default class Request {
    static get(url, data, options) {
        return fetch(url, {
            method: 'get',
            // headers: '',
            // mode: '',
            // cache: '',
            // credentials: '',
            // redirect: '',
            // integrity: '',
            ...params(data, options)
        })
    }

    static post(url, data, options) {
        return fetch(url, {
            method: 'post',
            // headers: '',
            // mode: '',
            ...params(data, options)
        })
    }

    static put(url, data, options) {
        return fetch(url, {
            method: 'put',
            // headers: '',
            // mode: '',
            ...params(data, options)
        })
    }

    static patch(url, data, options) {
        return fetch(url, {
            method: 'patch',
            // headers: '',
            // mode: '',
            ...params(data, options)
        })
    }

    static delete(url, data, options) {
        return fetch(url, {
            method: 'delete',
            // headers: '',
            // mode: '',
            ...params(data, options)
        })
    }

    static integrate(rule, cause) {
        return integrate(rule, cause)
    }
}