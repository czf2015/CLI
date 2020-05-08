// 数据监听
export function observe(data = {}) {
    return new Proxy(data, {
        set: (target, key, receiver) => {
            const val = Reflect.set(target, key, receiver)
            this.shadow.innerHTML = this.render(data)
            this.listen();
            return val;
        }
    })
}

// 双向数据绑定不适合内部嵌套其他组件的情况，当state改变时会导致嵌套的组件重新渲染
export class AbstractShadow extends HTMLElement {
    constructor() {
        super();

        this.shadow = this.attachShadow({ mode: 'closed' });

        // 单向传递
        const props = {}
        const atrributes = this.getAttributeNames()
        atrributes.forEach(attribute => props[attribute] = this.getAttribute(attribute))
        this.state = observe.bind(this)({...this.data(), ...props})

        this.shadow.innerHTML = this.render(this.state);
        this.listen()
    }

    render(state) {}

    data() {}

    // 监听
    listen() {}
}

export class BrowserRoute extends AbstractShadow {
    render({ path, tag }) {
        const isShow = (path) => {
            const paths = (window.location.pathname || '/').split('/')
            const slugs = path.split('/')
            if (slugs.length !== paths.length) {
                return false
            }
            for (let i = 0; i < slugs.length; i++) {
                if (slugs[i].includes(':')) {
                    return true
                } else {
                    if (slugs[i] !== paths[i]) {
                        return false
                    }
                }
            }
            return true
        }
        return isShow(path) ? `<${tag}></${tag}>` : ''
    }
}
