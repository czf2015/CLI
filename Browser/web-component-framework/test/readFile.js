const xsxl = require('xsxl')

class XLSX {
    constructor(file) {
        this.file = file
    }

    read(sheet) {
        const workbook = xsxl.readFile(path);
        console.log(workbook)
        const worksheet = workbook.Sheets[workbook.SheetNames[sheet]];
        // console.log(worksheet)
        const data = xsxl.utils.sheet_to_json(worksheet);
        // console.log(data)
        // const header = data[0] // 提取表格头
        const keyMap = data[0] // key映射表
        return data.slice(1) // 去除表头后的数据
            .map(record => Object.keys(record)
                .reduce((newData, key) => {
                    newData[keyMap[key] || key] = record[key]
                    return newData
                }, {}))
    }
}

const xls = new XLSX('../docs/开放发展.xlsx')

const result = xls.read(3)

console.log(result)