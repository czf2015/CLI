import { Request } from '../lib/framework/index.js'


export default class Service {
    constructor(api) {
        this.api = api
    }

    get(params) {
        return Request.get(this.api.GET || this.api, params)
    }

    post(params) {
        return Request.post(this.api.POST || this.api, params)
    }

    put(params) {
        return Request.put(this.api.PUT || this.api, params)
    }

    patch(params) {
        return Request.patch(this.api.PATCH || this.api, params)
    }

    delete(params) {
        return Request.delete(this.api.DELETE || this.api, params)
    }
}