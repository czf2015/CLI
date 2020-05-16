// models数据与表中字段的映射
export default {
    Product: {
        unit: {
            price: 'unit_price',
            quantity: 'unit_quantity'
        },
        createdAt: 'ctime',
        modifiedAt: 'mtime',
    }
}