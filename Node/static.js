const fs = require('fs')
const path = require('path')
const url = require('url')

module.exports = (req, res) => {
    const {pathname} = url.path(req.url)
    fs.readFile(path.join(ROOT, pathname), (err, file) => {
        if (err) {
            res.writeHead(404)
            res.end('找不到相关文件')
            return
        }
        res.writeHead(200)
    })
}