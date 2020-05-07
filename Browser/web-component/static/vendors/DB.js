// class DB {
//     constructor(name, version) {
//         // indexedDB.open()方法打开数据库，返回一个 IDBRequest 对象。
//         // 该对象通过error、success、upgradeneeded三种事件处理打开数据库的操作结果。
//         const request = window.indexedDB.open(name, version)
//         request.onerror = (event) => {
//             console.log('数据库打开报错');
//         };
//         request.onsuccess = (event) => {
//             Object.assign(this, request.result)
//             console.log('数据库打开成功');
//         };
//         request.onupgradeneeded = (event) => {
//             Object.assign(this, event.target.result)
//             console.log('数据库新建或升级成功')
//         }
//     }
//     static open(name, version) {
//         return new Promise((resolve, reject) => {
//             const request = window.indexedDB.open(name, version)
//             request.onsuccess = (event) => {
//                 console.log('数据库打开成功');
//                 const db = request.result
//                 resolve(db)
//             };
//             request.onupgradeneeded = (event) => {
//                 console.log('数据库新建或升级成功')
//                 const db = event.target.result
//                 resolve(db)
//             }
//             request.onerror = (event) => {
//                 console.log('数据库打开报错');
//                 reject(event)
//             };
//         })
//     }
//     create(db, tableName, primaryKey, entries) {
//         if (!db.objectStoreNames.contains(tableName)) {
//             const table = db.createObjectStore(tableName, {
//                 keyPath: primaryKey,
//                 // 如果数据记录里面没有合适作为主键的属性，那么可以让 IndexedDB 自动生成主键。
//                 // autoIncrement: true,
//             })
//             // IDBObject.createIndex()的三个参数分别为**索引名称、索引所在的属性、配置对象（说明该属性是否包含重复的值）**。
//             Object.entries(entries).forEach(([key, { value, config }]) => {
//                 table.createIndex(key, value, config)
//             })
//             return table
//         }
//     }
//     add(db, tableName, entry) {
//         return new Promise((resolve, reject) => {
//             const table = db.transaction([tableName], 'readwrite')
//                 .objectStore(tableName)
//             const request = table.add(entry) //   .add({ id: 1, name: '张三', age: 24, email: 'zhangsan@example.com' });

//             request.onsuccess = (event) => {
//                 console.log('数据写入成功');
//                 resolve(db)
//             };

//             request.onerror = (event) => {
//                 console.log('数据写入失败');
//                 reject('数据写入失败')
//             }
//         })
//     }
//     read(db, tableName, primaryKey) {
//         return new Promise((resolve, reject) => {
//             const transaction = db.transaction([tableName]);
//             const request = transaction.objectStore(tableName).get(primaryKey);

//             request.onsuccess = (event) => {
//                 if (request.result) {
//                     // console.log('Name: ' + request.result.name);
//                     // console.log('Age: ' + request.result.age);
//                     // console.log('Email: ' + request.result.email);
//                     resolve(request.result)
//                 } else {
//                     console.log('未获得数据记录');
//                     reject('未获得数据记录')
//                 }
//             };

//             request.onerror = (event) => {
//                 console.log('数据读取失败');
//                 reject('数据读取失败')
//             };
//         })
//     }
//     readAll(tableName) {
//         return new Promise((resolve, reject) => {
//             const table = this.transaction(tableName).objectStore(tableName);

//             table.openCursor().onsuccess = (event) => {
//                 var cursor = event.target.result;
//                 if (cursor) {
//                     // console.log('Id: ' + cursor.key);
//                     // console.log('Name: ' + cursor.value.name);
//                     // console.log('Age: ' + cursor.value.age);
//                     // console.log('Email: ' + cursor.value.email);
//                     cursor.continue();
//                     resolve(cursor)
//                 } else {
//                     console.log('没有更多数据了！');
//                     reject('没有更多数据了')
//                 }
//             };
//         })
//     }
//     update(tableName, entry) {
//         return new Promise((resolve, reject) => {
//             const request = this.transaction([tableName], 'readwrite')
//                 .objectStore(tableName)
//                 // .put({ id: 1, name: '李四', age: 35, email: 'lisi@example.com' });
//                 .put(entry)

//             request.onsuccess = (event) => {
//                 console.log('数据更新成功');
//                 resolve(entry)
//             };

//             request.onerror = (event) => {
//                 console.log('数据更新失败');
//                 reject('数据更新失败')
//             }
//         })
//     }
//     remove(tableName, primaryKey) {
//         return new Promise((resolve, reject) => {
//             const request = this.transaction([tableName], 'readwrite')
//                 .objectStore(tableName)
//                 .delete(primaryKey);

//             request.onsuccess = (event) => {
//                 console.log('数据删除成功');
//                 resolve()
//             };

//             request.onerror = (event) => {
//                 console.log('数据删除失败');
//                 reject('数据删除失败')
//             }
//         })
//     }
// }

function open(dbName, version) {
    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open(dbName, version)
        request.onsuccess = (event) => {
            console.log('数据库打开成功');
            debugger
            const db = request.result
            resolve(db)
        };
        request.onupgradeneeded = (event) => {
            console.log('数据库新建或升级成功')
            debugger
            const db = event.target.result
            resolve(db)
        }
        request.onerror = (event) => {
            console.log('数据库打开报错');
            reject(event)
        };
    })
}

function create(db, tableName, primaryKey, entries) {
    if (!db.objectStoreNames.contains(tableName)) {
        const table = db.createObjectStore(tableName, {
            // keyPath: primaryKey,
            // 如果数据记录里面没有合适作为主键的属性，那么可以让 IndexedDB 自动生成主键。
            autoIncrement: true,
        })
        // IDBObject.createIndex()的三个参数分别为**索引名称、索引所在的属性、配置对象（说明该属性是否包含重复的值）**。
        Object.entries(entries).forEach(([key, { value, config }]) => {
            table.createIndex(key, value, config)
        })
        return table
    }
}

function add(db, tableName, entry) {
    return new Promise((resolve, reject) => {
        const table = db.transaction([tableName], 'readwrite')
            .objectStore(tableName)
        const request = table.add(entry) //   .add({ id: 1, name: '张三', age: 24, email: 'zhangsan@example.com' });

        request.onsuccess = (event) => {
            console.log('数据写入成功');
            resolve(db)
        };

        request.onerror = (event) => {
            console.log('数据写入失败');
            reject('数据写入失败')
        }
    })
}

function read(db, tableName, primaryKey) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([tableName]);
        const request = transaction.objectStore(tableName).get(primaryKey);

        request.onsuccess = (event) => {
            if (request.result) {
                // console.log('Name: ' + request.result.name);
                // console.log('Age: ' + request.result.age);
                // console.log('Email: ' + request.result.email);
                resolve(request.result)
            } else {
                console.log('未获得数据记录');
                reject('未获得数据记录')
            }
        };

        request.onerror = (event) => {
            console.log('数据读取失败');
            reject('数据读取失败')
        };
    })
}

function readAll(db, tableName) {
    return new Promise((resolve, reject) => {
        const table = db.transaction(tableName).objectStore(tableName);

        table.openCursor().onsuccess = (event) => {
            var cursor = event.target.result;
            if (cursor) {
                // console.log('Id: ' + cursor.key);
                // console.log('Name: ' + cursor.value.name);
                // console.log('Age: ' + cursor.value.age);
                // console.log('Email: ' + cursor.value.email);
                cursor.continue();
                resolve(cursor)
            } else {
                console.log('没有更多数据了！');
                reject('没有更多数据了')
            }
        };
    })
}

function update(db, tableName, entry) {
    return new Promise((resolve, reject) => {
        const request = db.transaction([tableName], 'readwrite')
            .objectStore(tableName)
            // .put({ id: 1, name: '李四', age: 35, email: 'lisi@example.com' });
            .put(entry)

        request.onsuccess = (event) => {
            console.log('数据更新成功');
            resolve(entry)
        };

        request.onerror = (event) => {
            console.log('数据更新失败');
            reject('数据更新失败')
        }
    })
}

function remove(db, tableName, primaryKey) {
    return new Promise((resolve, reject) => {
        const request = db.transaction([tableName], 'readwrite')
            .objectStore(tableName)
            .delete(primaryKey);

        request.onsuccess = (event) => {
            console.log('数据删除成功');
            resolve()
        };

        request.onerror = (event) => {
            console.log('数据删除失败');
            reject('数据删除失败')
        }
    })
}