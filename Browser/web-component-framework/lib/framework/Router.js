import { isRoute } from './utils.js'
import { Component } from './Component.js'

export class Router extends Component {
    render({ routes }) {
        return routes
            .map(({ path, tag, title }) => isRoute(path) ? `<${tag} title="${title}"></${tag}>` : '')
            .join('')
    }
}