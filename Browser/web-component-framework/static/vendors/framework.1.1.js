
// docs: [HTMLElement](https://www.w3school.com.cn/xmldom/dom_htmlelement.asp)

class Component extends HTMLElement {
    constructor() {
        super();
        this.cache = {}
        this.init()
            .then(({ props, data, computed, methods, mode }) => {
                this.create({ props, data, computed, methods, mode })
                    .then(this.mount) // ? connectedCallback
            })
    }

    async init()/* { props, data, computed, methods, mode } */ { }

    /* private */async create({ props = {}, data = {}, computed = {}, methods = {}, mode = 'closed' } = {}) {
        this.shadow = this.attachShadow({ mode });

        Object.keys(props).forEach(key => {
            const value = this.getAttribute(key)
            if (value) {
                Object.assign(props, { [key]: value })
            }
        })

        // 监听props变化，触发update生命周期
        this.props = new Proxy(props, {
            set: (target, key, receiver) => {
                const retVal = Reflect.set(target, key, receiver)
                this.update({ key: receiver })
                return retVal;
            }
        })

        this.reactive(props, data, computed, methods)
    }

    /* private */$(selector) {
        if (selector) {
            this.cache[selector] = this.shadow.querySelector(selector)
        }
        return this.cache[selector]
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

    /* private */reactive(props, data, computed, methods) {
        this.shadow.innerHTML = this.template()
        const state = { ...data, ...props }
        Object.keys(computed).forEach(key => {
            Object.defineProperty(state, key, {
                get () {
                    return computed[key](state)
                }
            })
        })
        this.state = state
        this.methods = methods
        const analyze = (node) => {
            const vm = {
                // node,
            }
            if (!['#text', 'SCRIPT', '#document-fragment'].includes(node.nodeName)/* text */) {
                const attrs = node.getAttributeNames()
                attrs.forEach(attr => {
                    if (attr.match(/\*([a-zA-Z\-]+)/)) {
                        if (!vm.directives) {
                            vm.directives = {}
                        }
                        vm.directives[attr] = this.state[node.getAttribute(attr)]
                    }
                    if (attr.match(/\:([a-zA-Z\-]+)/)) {
                        if (!vm.attributes) {
                            vm.attributes = {}
                        }
                        vm.attributes[attr] = this.state[node.getAttribute(attr)]
                    }
                    if (attr.match(/\@([a-zA-Z\-]+)/)) {
                        if (!vm.listeners) {
                            vm.listeners = {}
                        }
                        vm.listeners[attr] = () => this.methods[node.getAttribute(attr)](this.state)
                    }
                })
            }
            if (vm.directives || vm.attributes || vm.listeners) {
                vm.vnode = node
            }
            if (node.childNodes && node.childNodes.length > 0) {
                for (const childNode of node.childNodes) {
                    if (!['SCRIPT'].includes(childNode.nodeName)/* SCRIPT */) {
                        if (Object.keys(analyze(childNode)).length > 0) {
                            if (!vm.children) {
                                vm.children = []
                            }
                            vm.children.push(analyze(childNode))
                        }
                    }
                }
            }
            return vm
        }
        this.vm = analyze(this.shadowRoot)
        console.log(this.vm)
        console.log(this.vm.children[0].children[0].vnode)
        // console.log(this.vm.children[1])
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
