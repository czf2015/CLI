// docs: https://wangdoc.com/javascript/bom/indexeddb.html
/* 对不同浏览器的indexedDB进行兼容 */
const indexedDB = window.indexedDB || window.webkitindexedDB || window.mozIndexedDB || window.msIndexedDB

export class DB {
    constructor(dbName, dbVersion) {
        this.dbName = dbName
        this.dbVersion = dbVersion
        this.openDB().then(db => this.store = db)
    }
    // 打开数据库
    async openDB() {
        try {
            if (this.store) return Promise.resolve(this.store)
            const request = indexedDB.open(this.dbName, this.dbVersion);
            return new Promise((resolve, reject) => {
                request.onerror = (error) => {
                    console.error(error);
                    reject("打开数据库失败");
                };
                request.onsuccess = (event) => {
                    console.info("打开数据库成功");
                    resolve(event.target.result);
                };
                request.onupgradeneeded = (event) => {
                    console.info("升级数据库成功");
                    resolve(event.target.result);
                };
            });
        } catch (error) {
            console.error(error);
            return Promise.reject("打开数据库失败")
        }
    }
    // 删除
    async deleteDB() {
        try {
            const deleteQuest = indexedDB.deleteDatabase(this.dbName);
            deleteQuest.onerror = (error) => {
                console.error('删除数据库失败')
                return Promise.resolve(false);
            };
            deleteQuest.onsuccess = (event) => {
                console.info('删除数据库成功')
                return Promise.resolve(true);
            };
        } catch (error) {
            console.error(error)
            return Promise.resolve(false);
        }
    }
    // 关闭数据库
    async closeDB() {
        const db = await this.openDB()
        db.close()
    }
    // 创建表
    async create(table, option) {
        try {
            const request = indexedDB.open(this.dbName, this.dbVersion);
            return new Promise((resolve, reject) => {
                request.onerror = (error) => {
                    console.error('创建表失败');
                    return resolve(false);
                };
                request.onsuccess = (event) => {
                    console.info("打开数据库成功");
                };
                request.onupgradeneeded = (event) => {
                    console.info("升级数据库成功");
                    const db = event.target.result
                    if (!db.objectStoreNames.contains(table)) {
                        const objectStore = db.createObjectStore(table, {
                            keyPath: option.key,
                            autoIncrement: true
                        });
                        if (option.index) {
                            if (Array.isArray(option.index) && option.index.length > 0) {
                                for (let i = 0; i < option.index.length; i++) {
                                    const index = option.index[i];
                                    // 参数：索引名称、索引所在的属性、配置对象（说明该属性是否包含重复的值）
                                    objectStore.createIndex(index.key, index.key, {
                                        unique: index.unique
                                    });
                                }
                            } else {
                                objectStore.createIndex(option.index.key, option.index.key, {
                                    unique: option.index.unique
                                });
                            }
                        }
                        console.info('创建表成功')
                    } else {
                        console.info('该表已存在')
                    }
                    return resolve(true)
                };
            });
        } catch (error) {
            console.error('创建表失败');
            return Promise.resolve(false)
        }
    }
    // 查询数据 表名 索引值 索引 key  没有value key为key 而不是索引
    async find(table, keyValue, indexCursor) {
        try {
            const db = await this.openDB()
            const store = db
                .transaction(table, "readonly")
                .objectStore(table);
            const request = !keyValue
                ? store.openCursor()
                : indexCursor
                    ? store.index(indexCursor).get(keyValue)
                    : store.get(keyValue);
            const data = [];
            return new Promise(resolve => {
                request.onerror = (error) => {
                    console.error(error)
                    reject("查询数据失败");
                };
                request.onsuccess = (event) => {
                    console.info("查询数据成功")
                    if (!keyValue && !indexCursor) {
                        if (event.target.result) {
                            data.push(event.target.result.value);
                            event.target.result.continue();
                        } else {
                            resolve(data);
                        }
                    } else {
                        resolve([event.target.result]);
                    }
                };
            });
        } catch (error) {
            console.error(error)
            return Promise.reject("查询数据失败");
        }
    }

    async alter({ method, params, table, tip }) {
        try {
            const db = await this.openDB();
            const store = db.transaction(table, 'readwrite').objectStore(table)
            const request = store[method](...params) // 操作方法
            return new Promise(resolve => {
                request.onerror = (error) => {
                    console.error(error)
                    resolve(false);
                }
                request.onsuccess = (event) => {
                    console.info(`${tip}成功`)
                    resolve(true);
                };
            })
        } catch (error) {
            console.error(error)
            return Promise.resolve(false);
        }
    }
    // 添加数据，add添加新值
    async insert(table, data) {
        return this.alter({ method: 'add', table, params: [data], tip: '添加数据' })
    }
    // 更新
    async update(table, data) {
        return this.alter({ method: 'put', table, params: [data], tip: '更新数据' })
    }
    // 删除数据
    async delete(table, keyValue) {
        return this.alter({ method: 'delete', table, params: [keyValue], tip: '删除数据' })
    }
    // 清空数据
    async clear(table) {
        return this.alter({ method: 'clear', table, tip: '清空数据' })
    }

    // 创建游标索引
    async createCursorIndex(table, index, unique) {
        return this.alter({ method: 'createIndex', table, data: [index, index, { unique }], tip: '创建游标索引' })
    }

    async handleDataByCursor(table, keyRange = '', cursorIndex = undefined) {
        try {
            const db = await this.openDB();
            const store = db.transaction(table, 'readwrite').objectStore(table)
            const request = cursorIndex
                ? store.index(cursorIndex).openCursor(keyRange)
                : store.openCursor(keyRange)
            return new Promise(resolve => {
                const tip = `通过${cursorIndex ? '索引游标' : '游标'}获取数据`
                request.onerror = (error) => {
                    console.error(error)
                    reject(`${tip}失败`);
                };
                request.onsuccess = (event) => {
                    const cursor = event.target.result;
                    console.info(`${tip}成功`)
                    resolve(cursor);
                };
            });
        } catch (error) {
            console.error(error)
            return Promise.reject(`${tip}失败`);
        }
    }

    // 通过索引游标操作数据, callback中要有游标移动方式
    async handleDataByIndex(table, keyRange, cursorIndex) {
        return this.handleDataByCursor(table, keyRange, cursorIndex)
    }
}