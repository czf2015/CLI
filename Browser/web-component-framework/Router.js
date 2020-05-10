
import { Router } from './lib/framework/index.js'
import routes from './config/routes.js'
import './pages/demoPage/_demo.js'
import './pages/homePage/index.js'


export default class extends Router {
    data() {
        return {
            routes
        }
    }
}
