// docs: https://wangdoc.com/javascript/bom/indexeddb.html

export class DB {
    constructor(dbName, dbVersion) {
        this.indexedDB = window.indexedDB || window.webkitindexedDB || window.msIndexedDB || window.mozIndexedDB
        this.dbName = dbName
        this.dbVersion = dbVersion
        this.store = {
            teacher: {
                name: "teacher",
                key: "id",
                cursorIndex: [{ name: "teachNum", unique: false }]
            },
            student: {
                name: "student",
                key: "id",
                cursorIndex: [{ name: "stuNum", unique: false }, { name: "age", unique: false }]
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
            const db = event.target.result;
            for (let tb in this.store) {
                if (!db.objectStoreNames.contains(this.store[tb].name)) {
                    const objectStore = db.createObjectStore(this.store[tb].name, {
                        keyPath: this.store[tb].key,
                        autoIncrement: true
                    });
                    for (let i = 0; i < this.store[tb].cursorIndex.length; i++) {
                        const element = this.store[tb].cursorIndex[i];
                        objectStore.createIndex(element.name, element.name, {
                            unique: element.unique
                        });
                    }
                }
            }
        };
    }
    // 打开数据库
    openDB() {
        return new Promise((resolve, reject) => {
            const request = this.indexedDB.open(this.dbName, this.dbVersion);

            request.onerror = function (event) {
                reject("IndexedDB数据库打开错误，" + event);
            };
            request.onsuccess = function (event) {
                resolve(event.target.result);
            };
        });
    }
    // 关闭数据库
    async closeDB(db) {
        try {
            if (!db) {
                db = await this.openDB();
            }
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
    // 删除表
    deleteDB(table) {
        const deleteQuest = this.indexedDB.deleteDatabase(table);
        deleteQuest.onerror = function () {
            return Promise.resolve(false);
        };
        deleteQuest.onsuccess = function () {
            return Promise.resolve(true);
        };
    }
    // 查询数据 表名 索引值 索引 key  没有value key为key 而不是索引
    async get(table, keyValue, indexCursor) {
        try {
            const db = await this.openDB();
            const store = db
                .transaction(table.name, "readonly")
                .objectStore(table.name);
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
                .transaction(table.name, "readwrite")
                .objectStore(table.name)
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
                .transaction(table.name, "readwrite")
                .objectStore(table.name)
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
                .transaction(table.name, "readwrite")
                .objectStore(table.name)
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
        const store = db.transaction(table.name, "readwrite").objectStore(table.name);
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
    async createCursorIndex(table, cursorIndex, unique) {
        const db = await this.openDB();
        const store = db.transaction(table, "readwrite").objectStore(table);
        store.createIndex(cursorIndex, cursorIndex, {
            unique: unique
        });
        return Promise.resolve();
    }
}