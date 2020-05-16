
// docs: [HTMLElement](https://www.w3school.com.cn/xmldom/dom_htmlelement.asp)

class Component extends HTMLElement {
    constructor() {
        super();
        this.init()
    }

    init() {
        // 创建
        this.shadow = this.attachShadow({ mode: 'closed' });
        this.state = this.data()
        // 更新
        this.setState(this.props())
        const template = this.template(this.state).replace(/\s*=\s*/g, '=')
        // console.log(template)
        this.directive(template)
        this.bindView(template)
        this.addEvent(template)
        // 
        this.once()
    }

    data() {
        return {}
     }

    props(data) {
        if (data) {
            Object.assign(this.state, data)
        } else {
            const props = {}
            const atrributes = this.getAttributeNames()
            atrributes.forEach(attribute => props[attribute] = this.getAttribute(attribute))
            Object.assign(this.state, props)
        }
    }

    setState(data) {
        if (typeof data === 'object') {
            Object.assign(this.state, data)
            // this.shadow.innerHTML = template;
            this.listen()
        }
    }

    template(state) { }

    /* private */directive(template) {
        const matches = template.match(/\s+\*([a-zA-Z\_]+)=\"{1}([\S]+[^\"]*[\S]+)\"{1}/)
        // console.log(matches[0])
    }

    /* private */bindView(template) {
        const matches = template.match(/\s+\:([a-zA-Z\_]+)=\"{1}([\S]+[^\"]*[\S]+)\"{1}/)
        // console.log(matches[0])
    }

    /* private */addEvent(template) {
        const matches = template.match(/\s+\@([a-zA-Z\_]+)=\"{1}(\S+)\"{1}/)
        // console.log(matches[0])
    }

    // 根据state变化计算可变节点
    /* private */diff() {
    }

    render() {
        return this.template()
            // .replace(/\>\s*\</g, _ => _.replace(/\s+/g, ''))
            .replace(/\s*=\s*/g, '=') // 去除等号两边空格
        // .replace(/\>\s*(\{[\s\S]*\})\s*\</g, _ => _.replace(/\s+/g, '')) // 去除{}空格
    }

    $(selector, isAll = false) {
        return isAll ? this.shadow.queryAllSelector(selector) : this.shadow.querySelector(selector)
    }

    // 每次状态更新，需要重新绑定
    listen() { }

    // 仅在初始化完成时执行一次
    once() { }
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
