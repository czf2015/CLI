import Service from './Service.js'


export class User extends Service {
    get(params, options) {
        return `${options} is special`
    }

    async post(params) {
        return this.db.insert(this.table, params)
    }

    patch(params) {
        return `局部更新${params}`
    }
    
    delete(params) {
        throw Error("this service don't define delete interface")
    }
}