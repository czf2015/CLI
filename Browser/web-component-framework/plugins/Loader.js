export default class {
    constructor(/* resource */) {
       /*  this.resource = resource */
        this.cache = {}
        this.history = {}
    }

    async upload(src, type) {
        if (this.history[src] && !confirm(`${src} has been uploaded, are you sure to upload again ?`)) return
        this.history[src] = Date.now()
        return await load(src, type)
    }

    async download(src, type) {
        if (this.cache[src] && !confirm(`${src} has been downloaded, are you sure to download again ?`)) {
            return
        }
        const content = await load(src)
        if (confirm(`${src} has been downloaded, are you sure to download again ?`)) {
            this.save(src)
        }
        this.cache[src] = {
            type,
            content
        }
    }

    async save(src) {
        this.cache[src].content
    }

    async delete(src) {}
}