import { DB } from '../lib/framework/index.js'

const dbName = 'test'
const dbVersion = 4
const db = new DB(dbName, dbVersion)

export default db