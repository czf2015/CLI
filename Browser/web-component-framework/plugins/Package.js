// TODO:
export default class Package {
    constructor(entry, output) {
        this.entry = entry
        this.output = output
        this.dependencies = []
    }

    bundle() {}

    unpkg() {}
}