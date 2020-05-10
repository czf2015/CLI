import { API } from '../lib/framework/index.js'
import services from '../services/index.js'
import User from './models/User.js'
import Account from './models/Account.js'


export const ACCOUNT = services.ACCOUNT || new API(Account)
export const USER = services.USER || new API(User)
