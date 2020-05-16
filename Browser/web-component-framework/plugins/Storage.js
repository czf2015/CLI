// TODO
export default class Storage {
    constructor(storageName) {
        this.name = storageName
        this.storage = window[storageName]
    }

    get(key) {
        return this.storage.get(key)
    }

    set(key, value) {
        return this.storage.set(key, value)
    }

    remove(key) {
        return this.storage.removeItem(key)
    }

    clear() {}
}