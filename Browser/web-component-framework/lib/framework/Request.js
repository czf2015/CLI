// 请求
export class Request {
    static get(api, params) {
        return api.get(params)
    }
    static post(api, params) {
        return api.post(params)
    }
    static put(api, params) {
        return api.put(params)
    }
    static patch(api, params) {
        return api.patch(params)
    }
    static delete(api, params) {
        return api.delete(params)
    }
}