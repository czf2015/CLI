const XLS = require('../plugins/XLS.js')

const xls = new XLS('./开放发展.v1.xlsx') 


// const result = xls.read(8)

const result = xls.join(9)

console.log(result)