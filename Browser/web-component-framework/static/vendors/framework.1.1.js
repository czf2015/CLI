
// docs: [HTMLElement](https://www.w3school.com.cn/xmldom/dom_htmlelement.asp)

const getAttributes = (node) => {
    const props = {}
    const atrributes = node.getAttributeNames()
    atrributes.forEach(attribute => props[attribute] = node.getAttribute(attribute))
    return props
}

class Component extends HTMLElement {
    constructor() {
        super();

        this.init()
            .then(({ data, methods, mode }) => {
                this.create({ data, methods, mode })
                    .then(this.mount) // ? connectedCallback
            })
    }

    async init()/* { data, methods, mode } */ {
        return {
            data: {},
            methods: {
                fetch() { }
            }
        }
    }

    /* private */async create({ data = {}, methods = {}, mode = 'closed' } = {}) {
        this.shadow = this.attachShadow({ mode });

        this.state = data
        this.methods = methods

        const template = this.template()
            .replace(/\>\s*\</g, _ => _.replace(/\s+/g, ''))
            .replace(/\s*=\s*/g, '=')
            .replace(/\>\s*(\{[\s\S]*\})\s*\</g, _ => _.replace(/\s+/g, '')) // 去除{}空格

        this.shadow.innerHTML = template

        this.reactive()

        this.props = new Proxy(getAttributes(this), {
            set: (target, key, receiver) => {
                const retVal = Reflect.set(target, key, receiver)
                this.update({ key: receiver })
                return retVal;
            }
        })

        this.setState(this.props)
    }

    async mount() { }

    update(data) {
        this.setState(data)
    }

    async destroy() { }

    /* private */connectedCallback() {
        // this.mount()
    }

    /* private */disconnectedCallback() {
        this.destory()
    }

    template(state) { }

    setState(data) {
        if (typeof data === 'object') {
            Object.assign(this.state, data)
            this.render()
        }
    }

    /* private */reactive() {
        const analyze = (node) => {
            const vm = {
                node,
                directives: {},
                attributes: {},
                listeners: {},
            }
            if (!['#text', 'SCRIPT'].includes(node.nodeName)/* text */) {
                const attrs = node.getAttributeNames()
                attrs.forEach(attr => {
                    if (attr.match(/\*([a-zA-Z\-]+)/)) {
                        vm.directives[attr] = node.getAttribute(attr)
                    }
                    if (attr.match(/\:([a-zA-Z\-]+)/)) {
                        vm.attributes[attr] = node.getAttribute(attr)
                    }
                    if (attr.match(/\@([a-zA-Z\-]+)/)) {
                        vm.listeners[attr] = node.getAttribute(attr)
                    }
                })
            }
            if (node.childNodes && node.childNodes.length > 0) {
                vm.children = []
                for (const childNode of node.childNodes) {
                    if (!['SCRIPT'].includes(childNode.nodeName)/* SCRIPT */) {
                        vm.children.push(analyze(childNode))
                    }
                }
            }
            return vm
        }
        this.vm = analyze(this)
        console.log(this.vm)
    }

    // 根据state变化计算可变节点
    /* private */async diff() {
        return await []
    }

    /* private */async render() {
        const nodes = await this.diff()
        nodes.forEach(node => {
            const { selector, attribute, value } = node
            this.$(selector)[attribute] = value
        })
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
    template(/* { routes } */) {
        return (
            `<route *for="routes" *if="isRoute(.path)" :key=".title">{.title}</route>`
        )
    }
}
