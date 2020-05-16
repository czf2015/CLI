export default class DSV {
    constructor(records, columns/* [{ name, type }] */, separator = ',') {
        this.columns = columns
        this.separator = separator

        switch (typeof records) {
            case 'string':
                this.dsv = records
                break
            default:
                this.dsv = DSV.encode(records, separator)
                break
        }
    }
    // table信息编码成dsv
    static encode(table, separator = ',') {
        try {
            return table.map(record => record.join(separator))
                .join('\n')
        } catch (e) {
            throw e
        }
    }
    // dsv格式解码成table
    decode(separator = /\s*,\s*/) {
        try {
            return this.dsv.split(/\r*\n/)
                .map(record => record.split(separator)
                    .map((item, idx) => this.columns[idx].type(item)))
        } catch (e) {
            throw e
        }
    }
    // 
    get names() {
        return this.columns.map(({ name }) => name)
    }
    // 
    get records() {
        return [this.names, ...this.decode(this.separator)]
    }
}