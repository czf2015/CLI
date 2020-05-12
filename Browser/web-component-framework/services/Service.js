import { Request } from '../lib/framework/index.js'
import db from '../config/db.js'


export default class Service {
    constructor(api, model) {
        this.api = api
        this.model = model
        db.openDB().then(store => {
            db.create('service', {
                key: "id",
                index: [{ key: 'key', unique: false }]
            })
        })
    }

    async get(params) {
        return Request.get(this.api.GET || this.api, params)
    }

    async post(params) {
        // return Request.post(this.api.POST || this.api, params)
        return db.insert('service', params)
    }

    async put(params) {
        return Request.put(this.api.PUT || this.api, params)
    }

    async patch(params) {
        return Request.patch(this.api.PATCH || this.api, params)
    }

    async delete(params) {
        return Request.delete(this.api.DELETE || this.api, params)
    }
}