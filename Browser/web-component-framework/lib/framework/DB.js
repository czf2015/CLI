// 可用于API中的数据存储
export class DB {
    // 创建新数据库
    constructor(dbName) {
    }
    // 查表
    async find(table, prerequisite = {}, skip = 0, limit = 10, sort = {}) {
        try {
            return await table.find(prerequisite).skip(skip).limit(limit).sort(sort)
        } catch (e) {
            throw(e)
        }
    }
    async findOne(table, prerequisite) { }
    async findAll(table, prerequisite) { }
    // 增表
    async insert(table, value) { }
    // 更新表
    async update(table, newVal, prerequisite) { }
    // 删除表
    async delete(table, prerequisite) { }
    async clear(table) {}
}