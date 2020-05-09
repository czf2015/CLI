import { AbstractShadow } from './Component.js'
import { isRoute } from './utils.js'

export class BrowserRoute extends AbstractShadow {
    render({ path, tag }) {
        return isRoute(path) ? `<${tag}></${tag}>` : ''
    }
}
