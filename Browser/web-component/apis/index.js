import API from './API/v1'
import User from './models/User'
import Account from './models/Account'

// v1 v2
export const ACCOUNT = new API(Account)
export const USER = new API(User)

// v3
// export const ACCOUNT = API(Account)
// export const USER = API(User)
