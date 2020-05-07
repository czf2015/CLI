
import Component from './components/Component.js'
import BrowseRoute from './components/Route.js'
import routes from './config/routes.js'

window.customElements.define('browse-route', BrowseRoute);


export default class Router extends Component {
    get template() {
        return routes
            .map(({ path, tag }) => `<browse-route path="${path}" tag="${tag}"></browse-route>`)
            .join('')
    }
}
