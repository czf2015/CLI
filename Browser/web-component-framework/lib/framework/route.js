import { Component } from './Component.js'
import { isRoute } from './utils.js'

export class Route extends Component {
    render({ path, tag }) {
        return isRoute(path) ? `<${tag}></${tag}>` : ''
    }
}
