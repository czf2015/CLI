// TODO
export default class File {
    constructor(file) {
        this.file = file
    }
    
    static async find(dir, filename) {}

    static async tranverse(dir, visit) {}

    async isExist() {}

    async isFile() {}

    async size() {}

    async open() {}

    async close() {}

    async copy(dst) {}

    async delete() {}

    async move(dst) {}
    
    async read() {}

    async write(content) {}

    async append(content, pos = -1/* 头部0 尾部-1 指定位置 */) {}
}