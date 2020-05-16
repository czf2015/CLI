import List from '../plugins/List.js'

// TODO
export default class Record {
    constructor(name) {
        this.name = name
        this.records = new List()
    }

    get result() {
        return this.records.find(params)
    }

    search(params) {
        return this.records.find(params)
    }

    save(params) {
        return this.records.insert(params)
    }

    revise(params) {
        return this.records.update(params)
    }

    remove(params) {
        return this.records.delete(params)
    }

    clear() {
        return this.records.clear()
    }

    print() {
        const records = this.records.find()
        console.table(records)
    }
}