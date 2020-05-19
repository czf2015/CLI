import { renderHTML, parseXML } from '../utils/index.js'


export default class XML {
    constructor(template) {
        this.template = template
    }

    static renderHTML(node) {
        return renderHTML(node)
    }

    parseXML() {
        return parseXML(this.template)
    }
}
