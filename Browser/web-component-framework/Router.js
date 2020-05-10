
import { Router } from './lib/framework/index.js'
import './pages/demoPage/_demo.js'
import './pages/homePage/index.js'


export default class extends Router {
    data() {
        return {
            routes: [
                {
                    path: '/',
                    tag: 'home-page'
                },
                {
                    path: '/demoPage/:demo',
                    tag: 'demo-page'
                },
            ]
        }
    }
}
