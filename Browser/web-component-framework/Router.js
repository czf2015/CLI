
import { Router } from './lib/framework/index.js'
import routes from './config/routes.js'

export default class extends Router {
    data() {
        return { routes }
    }
}