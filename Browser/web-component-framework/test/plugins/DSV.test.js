import DSV from '../../plugins/DSV.js'

const tb = [
    ['c', 0, 2.5, 50],
    ['z', 10, 40, 1.5],
    ['f', 20, 80, 1.75]
]

const columns = [
    {
        name: 'name',
        type: String,
    },
    {
        name: 'age',
        type: Number,
    }, {
        name: 'weight',
        type: Number,
    },
    {
        name: 'height',
        type: Number,
    },
]

const separator = ','

const dsv = new DSV(tb, columns, separator) // DSV.encode(tb)

console.log(dsv)

console.log(dsv.decode())

console.log(dsv.names)

console.log(dsv.records)