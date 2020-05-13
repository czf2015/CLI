import { Request } from '../lib/framework/index.js'
import db from '../config/db.js'


export default class Service {
    constructor(api, model) {
        this.api = api
        this.model = model
        db.create(this.api, {
            key: "id",
            index: [
                { key: 'id', unique: false }, 
                { key: 'name', unique: false }
            ]
        })
    }

    async get(params) {
        return Request.get(this.api.GET || this.api, params)
    }

    async post(params) {
        // db.close()
        // 删除数据库 验证成功
        // db.delete() 
        // 插入数据
        db.insert(this.api, params)
        // db.update(this.api, {
        //     errorMsg: 'error',
        //     successMsg: 'success'
        // })
        // 删除数据
        // db.remove(this.api, 'id')
        // 清空数据
        // db.clear(this.api)
        // db.createCursorIndex(this.api, 'id', false)
        // return Request.post(this.api.POST || this.api, params)
        // return db.insert(this.api, params)
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