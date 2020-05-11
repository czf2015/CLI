
import { Router } from './lib/framework/index.mjs'
// import '../pages/demoPage/_demo.js'
import '../pages/homePage/index.js'

export default class extends Router {
    data() {
        return { 
            routes: [
                {
                    path: '/',
                    tag: 'home-page',
                    title: '首页'
                },
                {
                    path: '/demoPage/:demo',
                    tag: 'demo-page',
                    title: 'demo'
                },
            ]
        }
    }
}