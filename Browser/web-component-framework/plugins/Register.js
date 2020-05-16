// TODO Map 类型
export default class Register {
    constructor(name) {
        this.name = name
        this.registry = {}
    }

    get(key) {
        return key ? this.registry[key] : this.registry
    }

    set(key, value) {
        this.registry[key] = value
    }
}