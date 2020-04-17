// createAt 2020-04-12 自动化打包、部署 node track path
const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')

const params = process.argv.slice(2) // 命令行参数
const last = new Date('2020-04-01T00:00:00.000Z') // 参照时间
const raw = '/tmp' // 存放目录
const lapse = 1000 * 5 // 运行时差
const separator = '\n' // 分行符

const dst = (filepath) => process.env.OS === 'Windows_NT' ? filepath.replace('\\', '\\tmp\\') : filepath.replace('/', `${raw}/`)


function modify(src, last) {
    const filepaths = []
    const handle = (src) => fs.readdirSync(src)
        .forEach(filename => {
            const filepath = path.resolve(src, filename)
            const stat = fs.statSync(filepath)
            if (stat.isFile()) {
                if (stat.mtime > last) {  
                    const type = stat.mtimeMs > stat.birthtimeMs + lapse ? '~' : '+'
                    filepaths.push({filepath, type})
                }
            } else {
                handle(filepath)
            }
        })
    handle(src)
    return filepaths
}


function pack(params) {
    const content = params.map(src => {
        const commands = []
        modify(src, last)
            .forEach(({filepath, type}) => {
                if (type !== '-') {
                    commands.push(`cp -rf ${filepath} ${dst(filepath)}`)
                }
            })
        return commands.join(separator)
    }).join(separator)
    mkdirp(`${__dirname}/../tmp`, err => fs.writeFileSync(`${__dirname}/../tmp/pack.sh`, content))
}


function deploy(params, last) {
    const content = params.map(src => {
        const commands = []
        modify(src, last)
            .forEach(({filepath, type}) => {
                switch (type) {
                    case '+':
                        commands.push(`cp -rf ${dst(filepath)} ${filepath}`)
                        break
                    case '~':
                        commands.push(`mv ${filepath} ${filepath}_bak`)
                        commands.push(`cp -rf ${dst(filepath)} ${filepath}`)
                        break
                    case '-':
                        commands.push(`mv ${filepath} ${filepath}_bak`)
                        break
                    default:
                        break
                }
            })
        return commands.join(separator)
    }).join(separator)
    mkdirp(`${__dirname}/../tmp`, err => fs.writeFileSync(`${__dirname}/../tmp/deploy.sh`, content))
}

// 命令行参数 追踪文件
function run(params) {
    mkdirp(raw , err => {
        if (err) {
            console.error(err)
        } else {
            pack(params, last)
            deploy(params, last)
        }
    })
}


run(params)