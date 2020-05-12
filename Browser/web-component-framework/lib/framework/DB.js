// docs: [IndexedDB 教程](https://cloud.tencent.com/developer/article/1190562)

/* 对不同浏览器的indexedDB进行兼容 */
const indexedDB = window.indexedDB || window.webkitindexedDB || window.mozIndexedDB || window.msIndexedDB
// 判断浏览器是否支持indexedDB
if (!indexedDB) {
    console.log('你的浏览器不支持IndexedDB');
}

export class DB {
    constructor(dbName, dbVersion) {
        this.dbName = dbName
        this.dbVersion = dbVersion
    }
    // 
    async getObjectStore(table, permission = 'readonly', db = undefined) {
        try {
            if (typeof db === 'undefined') {
                db = await this.openDB()
            }
            const transaction = db.transaction(table, permission)
            const objectStore = transaction.objectStore(table)
            return Promise.resolve(objectStore)
        } catch (error) {
            console.error(error)
            return Promise.reject(error);
        }
    }
    // 
    async acquiesce(request, tip, upgradeHandler = noop) {
        return new Promise((resolve, reject) => {
            request.onerror = (error) => {
                console.error(error)
                reject(error);
            }
            request.onsuccess = (event) => {
                console.info(`${tip}成功`)
                resolve(event.target.result);
            };
            request.onupgradeneeded = (event) => {
                console.info(`DB version changed to ${this.dbVersion}`);
                upgradeHandler(event.target.result)
            };
        })
    }
    // 打开数据库
    async openDB(upgradeHandler = noop) {
        const request = indexedDB.open(this.dbName, this.dbVersion);
        return this.acquiesce(request, 'open DB', upgradeHandler)
    }
    // 删除
    async deleteDB() {
        const deleteQuest = indexedDB.deleteDatabase(this.dbName);
        return this.acquiesce(deleteQuest, 'delete DB sucess')
    }
    // 关闭数据库
    async closeDB() {
        const db = await this.openDB()
        db.close()
    }

    // 创建表
    async create(table, option) {
        return this.openDB(async (db) => {
            try {
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
                    return Promise.resolve('success')
                } else {
                    console.info('该表已存在')
                    return Promise.resolve('fail')
                }
            } catch (error) {
                console.error(error)
                return Promise.reject(error)
            }
        })
    }
    // 查询数据 表名 索引值 索引 key  没有value key为key 而不是索引
    async find(table, keyValue, indexCursor) {
        try {
            const objectStore = await this.getObjectStore(table)
            const request = !keyValue
                ? objectStore.openCursor()
                : indexCursor
                    ? objectStore.index(indexCursor).get(keyValue)
                    : objectStore.get(keyValue);
            return new Promise((resolve, reject) => {
                request.onerror = (error) => {
                    console.error(error)
                    reject(error);
                };
                request.onsuccess = (event) => {
                    if (!keyValue && !indexCursor) {
                        const data = [];
                        if (event.target.result) {
                            data.push(event.target.result.value);
                            event.target.result.continue();
                        } else {
                            console.info("查询数据成功")
                            resolve(data);
                        }
                    } else {
                        console.info("查询数据成功")
                        resolve([event.target.result]);
                    }
                };
            });
        } catch (error) {
            console.error(error)
            return Promise.reject(error);
        }
    }

    async alter({ db, table, permission = 'readwrite', method, params, multiple = false/* 是否多个参数 */, tip }) {
        const objectStore = await this.getObjectStore(table, permission, db)
        const request = multiple
            ? objectStore[method](...params)
            : objectStore[method](params)
        return this.acquiesce(request, tip)
    }
    // 添加数据，add添加新值
    async insert(table, data) {
        return this.openDB(async (db) => await this.alter({ db, method: 'add', table, params: data, tip: '添加数据' }))
    }
    // 更新
    async update(table, data) {
        return this.alter({ table, method: 'put', params: data, tip: '更新数据' })
    }
    // 删除数据
    async delete(table, keyValue) {
        return this.alter({ table, method: 'delete', params: keyValue, tip: '删除数据' })
    }
    // 清空数据
    async clear(table) {
        return this.alter({ table, method: 'clear', tip: '清空数据' })
    }

    // 创建游标索引
    async createCursorIndex(table, index, unique) {
        return this.alter({ table, method: 'createIndex', params: [index, index, { unique }], multiple: true, tip: '创建游标索引' })
    }

    async getDataByCursor(table, keyRange = '', cursorIndex = undefined) {
        try {
            const objectStore = await this.getObjectStore(table, 'readwrite')
            const request = cursorIndex
                ? objectStore.index(cursorIndex).openCursor(keyRange)
                : objectStore.openCursor(keyRange)
            return this.acquiesce(request, `通过${cursorIndex ? '索引游标' : '游标'}获取数据成功`)
        } catch (error) {
            console.error(error)
            return Promise.reject(error);
        }
    }
}