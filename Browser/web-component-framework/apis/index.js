import { API } from '../lib/framework/index.js'
import User from './models/User'
import Account from './models/Account'


export const ACCOUNT = new API(Account)
export const USER = new API(User)
