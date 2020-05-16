import { attrs, html } from '../utils/index.js'

export default class Node {
    constructor(tag, attributes = {}, children = []) {
        this.tag = tag
        this.attributes = attributes
        this.children = children
    }

    renderHTML() {
        return html(this)
    }

    static parseXML(xml) {
        return html(xml, true)
    }
}
