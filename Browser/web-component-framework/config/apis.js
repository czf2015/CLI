import { API } from '../lib/framework/index.js'
import * as models from '../models/index.js'
import * as services from '../services/index.js'

const configure = (path, Creator) => {
    const Model = models[Creator]
    const Service = services[Creator]
    return Service ? new Service(path, Model) : new API(Model)
}


export const ACCOUNT = configure('/accounts', 'Account')

export const USER = configure('/users', 'User')