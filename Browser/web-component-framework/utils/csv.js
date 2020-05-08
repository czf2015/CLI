export function encode(table, separator = '\n') {
    return table.map(row => row.map(item => `'${item}'`).join(',')).join(separator)
}

export function decode(csv, separator = '\n') {
    return csv.split(separator).map(row => row.split(','))
}