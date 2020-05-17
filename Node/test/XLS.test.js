const XLS = require('../plugins/XLS.js')

const xls = new XLS('./开放发展.xlsx') 


// const result = xls.read(8)

const result = xls.join(9, ['全国', '环渤海', '长三角'], [/行为流出地，列为流入地/])

console.log(result)