import Service from './Service.js'


export default class User extends Service {
    get(params, options) {
        return `${options} is special`
    }
    patch(params) {
        return `局部更新${params}`
    }
    delete(params) {
        throw Error("this service don't define delete interface")
    }
}