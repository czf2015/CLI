import { DB } from '../lib/framework/index.js'
import { dbName, dbVersion } from './db.js'

const db = new DB(dbName, dbVersion)

export default {
    db
}