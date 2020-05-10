import { isRoute } from './utils.js'
import { Component } from './Component.js'

class BrowserRoute extends Component {
    render({ path, tag }) {
        return isRoute(path) ? `<${tag}></${tag}>` : ''
    }
}

window.customElements.define('browser-route', BrowserRoute)