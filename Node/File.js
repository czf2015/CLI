// [Node.js文件系统、路径的操作函数](https://www.cnblogs.com/gaojun/p/4159488.html)
const fs = require('fs')
const path = require('path')


function isExist(filepath) {
    return fs.existsSync(filepath)
}

function isFile(src) {
    if (isExist(src)) {
        return fs.statSync(src).isFile()
    } else {
        console.warn(`${src} not exist`)
    }
}

function ensureDirectoryExistence(filePath) {
    const dirname = path.dirname(filePath)
    if (!isExist(dirname)) {
        ensureDirectoryExistence(dirname)
        fs.mkdirSync(dirname)
    }
}

// 传递文件
function pipe(src, dst) {
    ensureDirectoryExistence(dst)
    fs.createReadStream(src).pipe(fs.createWriteStream(dst))
}


function copy(src, dst) {
    fs.exists(dst, isExist => {
        if (isExist) {
            fs.stat(src, (err, stat) => {
                if (err) throw err
                if (stat.isFile()) {
                    pipe(src, path.resolve(dst, path.basename(src)))
                } else {
                    fs.readdir(src, (err, paths) => {
                        if (err) throw err
                        paths.forEach(path => {
                            const _src = `${src}/${path}`
                            const _dst = `${dst}/${path}`
                            fs.stat(_src, (err, stat) => {
                                if (err) throw err
                                if (stat.isFile()) {
                                    pipe(_src, _dst)
                                } else {
                                    copy(_src, _dst)
                                }
                            })
                        })
                    })
                }
            })
        } else {
            fs.mkdir(dst, () => copy(src, dst))
        }
    })
}


function read(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}


function write(filePath, content) {
    return new Promise((resolve, reject) => {
        ensureDirectoryExistence(filePath)
        fs.writeFile(filePath, content, err => {
            if (err) {
                reject(err)
            } else {
                resolve({ code: 0, msg: 'ok' })
            }
        })
    })
}


function remove(src) {
    if (isExist(src)) {
        if (isFile(src)) {
            fs.unlinkSync(src)
        } else {
                fs.readdirSync(src).forEach(path => {
                    const _src = `${src}/${path}`
                    remove(_src)
                })
    
            fs.rmdirSync(src)
        }
    } else {
        console.warn(`${src} not exist`)
    }
}

function rename(src,dst) {
    if (isExist(src)) {
        fs.renameSync(src, dst)
    } else {
        console.warn(`${src} not exist`)
    }
}

async function tranverse(dir, visit) {
    for (let item of fs.readdirSync(dir)) {
        const itemPath = path.join(dir, item)
        const isDir = fs.statSync(itemPath).isDirectory()
        await visit(itemPath)
        if (isDir) {
            await traverse(itemPath, visit)
        }
    }
}

function find(src, filename) {
    src = path.resolve(__dirname, src)
    fs.exists(src, isExist => {
        if (isExist) {
            fs.stat(src, (err, stat) => {
                if (err) throw err
                if (stat.isFile()) {
                    if (path.basename(src) === filename) {
                        console.log(src)
                    }
                } else {
                    fs.readdir(src, (err, paths) => {
                        if (err) throw err
                        paths.forEach(path => {
                            const _src = `${src}/${path}`
                            find(_src, filename)                            
                        })
                    })
                }
            })
        } else {
            console.warn(`${src} not exist`)
        }
    })
}



module.exports = {
    isExist,
    ensureDirectoryExistence,
    pipe,
    read,
    write,
    copy,
    remove,
    rename,
    tranverse,
    find,
}
