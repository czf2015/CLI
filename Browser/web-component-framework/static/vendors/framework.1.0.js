
// docs: [HTMLElement](https://www.w3school.com.cn/xmldom/dom_htmlelement.asp)

class Component extends HTMLElement {
    constructor() {
        super();

        this.shadow = this.attachShadow({ mode: 'closed' });

        // props属性
        const props = {}
        const atrributes = this.getAttributeNames()
        atrributes.forEach(attribute => props[attribute] = this.getAttribute(attribute))

        // 页面状态
        this.state = { ...this.data(), ...props }

        // 单向传递 props可传递数据、函数及更复杂的对象
        this.props = new Proxy(props, {
            set: (target, key, receiver) => {
                const retVal = Reflect.set(target, key, receiver)
                this.setState(target)
                return retVal;
            }
        })

        this.shadow.innerHTML = this.render()
        this.listen()

        this.once()
    }

    render() {
        return this.template()
            // .replace(/\>\s*\</g, _ => _.replace(/\s+/g, ''))
            .replace(/\s*=\s*/g, '=') // 去除等号两边空格
            // .replace(/\>\s*(\{[\s\S]*\})\s*\</g, _ => _.replace(/\s+/g, '')) // 去除{}空格
    }

    template(state) { }

    data() { }

    setState(data) {
        if (typeof data === 'object') {
            Object.assign(this.state, data)
            // this.shadow.innerHTML = template;
            this.listen()
        }
    }

    // 每次状态更新，需要重新绑定
    listen() { }

    // 仅初始化完成时执行一次
    once() { }

    $(selector) {
        return this.shadow.querySelector(selector)
    }
}

const customElementRegister = (customs) => Object.entries(customs)
    .forEach(custom => window.customElements.define(...custom))

const isRoute = (path) => {
    const paths = (window.location.pathname || '/').split('/')
    const slugs = path.split('/')
    if (slugs.length !== paths.length) return false
    for (let i = 0; i < slugs.length; i++) {
        if (slugs[i].includes(':')) return true
        if (slugs[i] !== paths[i]) return false
    }
    return true
}

class Router extends Component {
    template() {
        // return routes
        //     .map(({ path, tag, title }) => isRoute(path) ? `<${tag} title="${title}"></${tag}>` : '')
        //     .join('')
        return (
            `<route *for={({ path, tag, title }) in routes} is={tag} *if={isRoute(path)} :title={title}>{title}</route>`
        )
    }
}
