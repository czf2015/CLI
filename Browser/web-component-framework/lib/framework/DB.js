// docs: https://wangdoc.com/javascript/bom/indexeddb.html

export class DB {
    constructor(dbName, dbVersion) {
        /* 对不同浏览器的indexedDB进行兼容 */
        this.indexedDB = window.indexedDB || window.webkitindexedDB || window.mozIndexedDB || window.msIndexedDB
        this.dbName = dbName
        this.dbVersion = dbVersion
        this.store = {
            teacher: {
                name: "teacher",
                key: "id",
                index: [{ name: "teachNum", unique: false }]
            },
            student: {
                name: "student",
                key: "id",
                index: [{ key: "stuNum", unique: false }, { key: "age", unique: false }]
            }
        }
    }
    // 
    async initDB() {
        const request = this.indexedDB.open(this.dbName, this.dbVersion);
        request.onerror = function () {
            console.log("打开数据库失败");
        };
        request.onsuccess = function () {
            console.log("打开数据库成功");
        };
        request.onupgradeneeded = (event) => {
            console.log("升级数据库成功");
        };
    }
    // 打开数据库
    openDB() {
        const request = this.indexedDB.open(this.dbName, this.dbVersion);
        return new Promise((resolve, reject) => {
            request.onerror = function (event) {
                reject("IndexedDB数据库打开错误，" + event);
            };
            request.onsuccess = function (event) {
                resolve(event.target.result);
            };
        });
    }
    // 关闭数据库
    async closeDB() {
        try {
            const db = await this.openDB();
            const closeQuest = db.closeDB();
            return new Promise(resolve => {
                closeQuest.onerror = function () {
                    resolve(false);
                };
                closeQuest.onsuccess = function () {
                    resolve(true);
                };
            });
        } catch (error) {
            return Promise.resolve(false);
        }
    }
    // 删除
    deleteDB() {
        const deleteQuest = this.indexedDB.deleteDatabase(this.dbName);
        deleteQuest.onerror = function () {
            return Promise.resolve(false);
        };
        deleteQuest.onsuccess = function () {
            return Promise.resolve(true);
        };
    }
    // 创建表
    async create(table, option) {
        try {
            const request = this.indexedDB.open(this.dbName, this.dbVersion);
            
            return new Promise((resolve, reject) => {
                request.onerror = function (error) {
                    console.log("打开数据库失败");
                    reject(error)
                };

                request.onsuccess = function () {
                    console.log("打开数据库成功");
                };

                request.onupgradeneeded = function (event) {
                    console.log('create table')
                    const db = event.target.result;
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
                    }
                    resolve(table)
                };
            })
        } catch (error) {
            console.log(error);
            return Promise.resolve(false);
        }
    }
    // 查询数据 表名 索引值 索引 key  没有value key为key 而不是索引
    async find(table, keyValue, indexCursor) {
        try {
            const db = await this.openDB();
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
                request.onerror = function () {
                    resolve("查询数据失败");
                };
                request.onsuccess = function (event) {
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
            return Promise.reject(error);
        }
    }
    // 添加数据，add添加新值
    async insert(table, data) {
        try {
            const db = await this.openDB();

            const request = db
                .transaction(table, "readwrite")
                .objectStore(table)
                .add(data);

            return new Promise((resolve, reject) => {
                request.onerror = function () {
                    reject("添加数据出错");
                };
                request.onsuccess = function () {
                    resolve(true);
                };
            });
        } catch (error) {
            console.log(error);
            return Promise.resolve(false);
        }
    }
    // 更新
    async update(table, data) {
        try {
            const db = await this.openDB();
            const request = db
                .transaction(table, "readwrite")
                .objectStore(table)
                .put(data);
            return new Promise(resolve => {
                request.onerror = function () {
                    resolve(false);
                };
                request.onsuccess = function () {
                    resolve(true);
                };
            });
        } catch (error) {
            return Promise.resolve(false);
        }
    }
    // 删除数据
    async delete(table, keyValue) {
        try {
            const db = await this.openDB();
            const request = db
                .transaction(table, "readwrite")
                .objectStore(table)
                .delete(keyValue);
            return new Promise(resolve => {
                request.onerror = function () {
                    resolve(false);
                };
                request.onsuccess = function () {
                    resolve(true);
                };
            });
        } catch (error) {
            return Promise.resolve(false);
        }
    }
    // 清空数据
    async clear(table) {
        const db = await this.openDB();
        const store = db.transaction(table, "readwrite").objectStore(table);
        store.clear();
    }

    // 通过索引游标操作数据, callback中要有游标移动方式
    async handleDataByIndex(table, keyRange, sursorIndex) {
        try {
            const kRange = keyRange || "";
            const db = await this.openDB();
            const store = db.transaction(table, "readwrite").objectStore(table)
            const request = store.index(sursorIndex).openCursor(kRange);
            return new Promise(resolve => {
                request.onerror = function () {
                    resolve("通过索引游标获取数据报错");
                };
                request.onsuccess = function (event) {
                    const cursor = event.target.result;
                    if (cursor) {
                        resolve(cursor);
                    }
                };
            });
        } catch (error) {
            return Promise.reject(error);
        }
    }
    // 通过游标操作数据, callback中要有游标移动方式
    async handleDataByCursor(table, keyRange) {
        try {
            const kRange = keyRange || "";
            const db = await this.openDB();
            const store = db.transaction(table, "readwrite").objectStore(table)
            const request = store.openCursor(kRange);
            return new Promise(resolve => {
                request.onerror = function () {
                    resolve("通过游标获取数据报错");
                };
                request.onsuccess = function (event) {
                    const cursor = event.target.result;
                    resolve(cursor);
                };
            });
        } catch (error) {
            return Promise.reject(error);
        }
    }
    // 创建游标索引
    async createCursorIndex(table, index, unique) {
        const db = await this.openDB();
        const store = db.transaction(table, "readwrite").objectStore(table);
        store.createIndex(index, index, {
            unique: unique
        });
        return Promise.resolve();
    }
}