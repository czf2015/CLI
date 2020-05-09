
import { BrowserRoute, AbstractShadow } from './tools.js'
import routes from './config/routes.js'

window.customElements.define('browser-route', BrowserRoute);


export default class Router extends AbstractShadow {
    render() {
        return routes
            .map(({ path, tag }) => `<browser-route path="${path}" tag="${tag}"></browser-route>`)
            .join('')
    }
}
