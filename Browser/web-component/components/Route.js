import Component from './Component.js'


export default class Route extends Component {
    get template() {
        const path = this.getAttribute('path')
        const tag = this.getAttribute('tag')
        return window.location.pathname === path ? `<${tag}></${tag}>` : ''
    }
}