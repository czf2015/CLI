
import { Component } from './lib/framework/index.js'
import routes from './config/routes.js'


export default class Router extends Component {
    render() {
        return routes
            .map(({ path, tag }) => `<browser-route path="${path}" tag="${tag}"></browser-route>`)
            .join('')
    }
}
