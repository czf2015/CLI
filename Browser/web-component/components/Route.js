import Component from './Component.js'


export default class Route extends Component {
    get template() {
        return window.location.pathname === this.state.path ? `<${this.state.tag}></${this.state.tag}>` : ''
    }
}