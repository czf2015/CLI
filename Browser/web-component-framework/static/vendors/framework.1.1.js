
// docs: [HTMLElement](https://www.w3school.com.cn/xmldom/dom_htmlelement.asp)

const getAttrs = (attrs) => {
    const attributes = {}
    let flag = 0
    let attributeName = ''
    let attributeValue = ''
    let startTag
    for  (let i = 0; i < attrs.length; i++) {
        switch (flag) {
            case 0:
                if (attrs[i]) {
                    flag = 1
                    attributeName = attrs[i]
                }
                break
            case 1:
                if (attrs[i]) {
                    if (attrs[i] == '=') {
                        flag = 2
                    } else {
                        attributeName += attrs[i]
                    }
                }
                break
            case 2:
                if (attrs[i]) {
                    if (startTag) {
                        if (attrs[i] == startTag) {
                            attributes[attributeName] = attributeValue
                            attributeName = attributeValue = ''
                            startTag = undefined
                            flag = 0
                        } else {
                            attributeValue += attrs[i]
                        }
                    } else {
                        if (attrs[i] == '\'' || attrs[i] == '\"') {
                            startTag = attrs[i]
                        }
                    }
                }
                break
            default:
                break
        }
    }
    return attributes
}

const parseXML = (xml) => {
    console.log(xml)

    const fragments = xml.replace(/(\>\s+\<)|(\<\s+)|(\s+\>)|(\s*\/\s*)|(\s*=\s*)|\>\s*(\{[\s\S]*\})\s*\</g, ($, $1, $2, $3, $4, $5) => $1
        ? '><' : $2
            ? '<' : $3
                ? '>' : $4
                    ? '/' : $5
                        ? '=' : $.replace(/\s+/g, '')
    ).split(/\>\s*\</)

    const root = {
        tag: 'root',
        children: []
    }

    const tags = [root]

    const matchType1 = (fragment) => {
        const pattern = /^\<*(\S+)\s*([^\/\>]*)\/\>/
        const matches = fragment.match(pattern)
        if (matches) {
            if (matches[2].trim()) {
                tags[0].children.push({
                    tag: matches[1],
                    attributes: getAttrs(matches[2].trim()),
                })
            } else {
                tags[0].children.push({
                    tag: matches[1],
                })
            }
            return true
        }
    }

    const matchType2 = (fragment) => {
        const pattern = /^\<*(\S+)\s*([^\/\>]*)\>([\s\S]*)\<\//
        const matches = fragment.match(pattern)
        if (matches) {
            if (matches[2].trim()) {
                tags[0].children.push({
                    tag: matches[1],
                    attributes: getAttrs(matches[2].trim()),
                    text: matches[3]
                })
            } else {
                tags[0].children.push({
                    tag: matches[1],
                    text: matches[3]
                })
            }
            return true
        }
    }

    const matchType3 = (fragment) => {
        const pattern = /^\//
        if (fragment.match(pattern)) {
            const tag = tags.shift()
            tags[0].children.push(tag)
            return true
        }
    }

    const matchType4 = (fragment) => {
        const pattern = /^\<*(\S+)\s*([^\/\>]*)$/
        const matches = fragment.match(pattern)
        if (matches) {
            if (matches[2].trim()) {
                tags.unshift({
                    tag: matches[1],
                    attributes: getAttrs(matches[2].trim()),
                    children: []
                })
            } else {
                tags.unshift({
                    tag: matches[1],
                    children: []
                })
            }
            return true
        }
    }

    const matchType = (fragment) => matchType1(fragment) || matchType2(fragment) || matchType3(fragment) || matchType4(fragment)

    fragments.forEach(matchType)

    return root
}

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
        const state = { ...data, ...props }
        Object.keys(computed).forEach(key => {
            Object.defineProperty(state, key, {
                get() {
                    return computed[key](state)
                }
            })
        })
        this.state = state
        this.methods = methods
        const [template, style] = this.template()
        // console.log(template)
        // console.log(style)
        const tmpl = parseXML(template)

        console.log(tmpl)
        // console.log(style)
        const len = tmpl.length
        // let flag = ''
        // const tags = []
        const cache = []
        let flag
        let tag
        // for (let i = 0; i < len; i++) {
        //     // if (tags.length == 0) {
        //         const c = tmpl[i]
        //         switch (c) {
        //             case '<':
        //                 if (tag && flag == tag && cache.length > 0) {
        //                     const text = cache.join('')
        //                     console.log({ text })
        //                 }
        //                 flag = 'start'
        //                 break
        //             case '>':
        //                 if (flag = tag) {
        //                     const attributes = getAttrs(cache.join(''))
        //                     console.log({ attributes })
        //                     cache.length = 0
        //                 }
        //                 break
        //             case '/':
        //                 flag = 'end'
        //                 tags.shift()
        //                 break
        //             case ' ':
        //                 switch (flag) {
        //                     case 'start':
        //                         tag = cache.join('')
        //                         console.log({ tag })
        //                         tags.unshift(tag)
        //                         cache.length = 0
        //                         flag = tag
        //                         break
        //                     case tag:
        //                         cache.push(c)
        //                     default:
        //                         break
        //                 }
        //             default:
        //                 if (flag !== 'end') {
        //                     cache.push(c)
        //                 }
        //                 break
        //         }
        //     // } else {
        //     // }
        // }

        // this.shadow.innerHTML = this.template()
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
                    if (!['SCRIPT', 'STYLE'].includes(childNode.nodeName)/* SCRIPT */) {
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
        // this.vm = analyze(this.shadowRoot)
        // console.log(this.vm)
        // console.log(this.vm.children[0].children[0].vnode)
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
