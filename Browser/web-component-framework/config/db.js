import DB from '../plugins/DB.js'

const dbName = 'test'
const dbVersion = 4
const db = new DB(dbName, dbVersion)

export default db