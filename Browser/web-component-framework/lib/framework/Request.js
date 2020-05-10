const h = (params, options) => {
    return options ? options : { body: JSON.stringify(params) }
}

// 请求
export class Request {
    static get(url, params, options) {
        return fetch(url, {
            method: 'get',
            headers: '',
            mode: '',
            cache: '',
            credentials: '',
            redirect: '',
            integrity: '',
            ...h(params, options)
        })
    }

    static post(url, params, options) {
        return fetch(url, {
            method: 'post',
            headers: '',
            mode: '',
            ...h(params, options)
        })
    }

    static put(url, params, options) {
        return fetch(url, {
            method: 'put',
            headers: '',
            mode: '',
            ...h(params, options)
        })
    }

    static patch(url, params, options) {
        return fetch(url, {
            method: 'patch',
            headers: '',
            mode: '',
            ...h(params, options)
        })
    }

    static delete(url, params, options) {
        return fetch(url, {
            method: 'delete',
            headers: '',
            mode: '',
            ...h(params, options)
        })
    }
}