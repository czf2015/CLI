const xlsx = require('xlsx')


module.exports = class XLS {
    constructor(file) {
        this.file = file
    }

    toJSON(sheet) {
        const workbook = xlsx.readFile(this.file)
        const worksheet = workbook.Sheets[workbook.SheetNames[sheet]]
        return xlsx.utils.sheet_to_json(worksheet)
    }

    // 单一表
    read(sheet) {
        const data = this.toJSON(sheet)
        const header = data[0] // 提取表格头
        const convert = record => {
            const keyMap = {}
            let _key
            for (let key in header) {
                if (key.match(/__EMPTY/)) {
                    console.log('-----__EMPTY------')
                    keyMap[_key][key] = record[key]
                } else {
                    _key = key
                    keyMap[key] = {
                        [header[key]]: record[key]
                    }
                }
            }
            return keyMap
        }
        return data.slice(1).map(convert)
    }

    // 多联表
    join(sheet, names, patterns) {
        const result = {}
        const sheets = names.map(name => ({ name, data: [] }))
        let sheetsIdx = 0
        this.toJSON(sheet)
            .forEach(row => {
                let col = 0
                for (let key in row) {
                    if (row[key]) {
                        col++
                    } else {
                        break
                    }
                }
                if (col > 1) {
                    sheets[sheetsIdx].data.push(row)
                }
                if (col === 1) {
                    sheetsIdx++
                }
            })
        sheets.forEach(({ name, data }) => {
            const header = data[0]
            const convert = record => {
                const keyMap = {
                    key: '',
                    entries: [],
                }
                for (let key in header) {
                    if (patterns.some(pattern => header[key].match(pattern))) {
                        keyMap.key = record[key]
                    } else {
                        keyMap.entries.push({
                            key: header[key],
                            value: record[key]
                        })
                    }
                }
                return keyMap
            }
            result[name] = data.slice(1).map(convert)
        })
        return result
    }
}
