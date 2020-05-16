export default class Adapter {
    constructor(ORM) {
        Object.keys(ORM).forEach(key => this[key] = ORM[key])
        // return ORM
    }
}