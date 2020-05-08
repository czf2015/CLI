
import { Route, AbstractShadow } from './helpers.js'
import routes from './config/routes.js'

window.customElements.define('browser-route', Route);


export default class Router extends AbstractShadow {
    get template() {
        return routes
            .map(({ path, tag }) => `<browser-route path="${path}" tag="${tag}"></browser-route>`)
            .join('')
    }
}
