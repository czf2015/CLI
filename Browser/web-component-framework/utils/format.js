// 格式处理

// DSV格式 --编码
export const encodeDSV = (table, separator = ',') => {
    try {
        return table.map(record => record.join(separator))
            .join('\n')
    } catch (e) {
        throw e
    }
}
// --解码
export const decodeDSV = (dsv, columns, separator = /\s*,\s*/) => {
    try {
        return dsv.split(/\r*\n/)
            .map(record => record.split(separator)
                .map((item, idx) => columns[idx].type(item)))
    } catch (e) {
        throw e
    }
} 