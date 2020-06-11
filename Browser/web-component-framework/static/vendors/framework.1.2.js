
// docs: [HTMLElement](https://www.w3school.com.cn/xmldom/dom_htmlelement.asp)

const getAttrs = (attrs) => {
    const attributes = {}
    let flag = 0 // 0 --非属性 1 --属性名 2 --属性值
    let attributeName = ''
    let attributeValue = ''
    let startTag // 属性值起始符 ' --单引号 " --双引号 undefined --未定义
    for (let i = 0; i < attrs.length; i++) {
        switch (flag) {
            case 0:
                if (attrs[i].match(/\S/)) {
                    flag = 1
                    attributeName = attrs[i]
                }
                break
            case 1:
                if (attrs[i].match(/\S/)) {
                    if (attrs[i] == '=') {
                        flag = 2
                    } else {
                        attributeName += attrs[i]
                    }
                }
                break
            case 2:
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
                    if (attrs[i].match(/\S/)) {
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

const setAttrs = (attributes) =>
    Object.entries(attributes)
        .map(([attribute, value]) => {
            console.log({attribute, value})
            return `${attribute}="${typeof value == 'object' ? value.value : value}"`
        })
        .join(' ')

const renderHTML = (node) => {
    // TODO(czf)
    const h = ({ render, params, text }) => render ? render(params) : text || ''
    if (Array.isArray(node)) {
        return node.map(renderHTML).join('')
    } else {
        const { tag, attributes, children } = node
        return `<${tag} ${setAttrs(attributes)}>${children ? renderHTML(children) : h(node)}</${tag}>`
    }
}

const analyze = (xml) => {
    const vm = parseXML(xml)
    const handle = (node) => {
        if (node.attributes) {
            for (let key in node.attributes) {
                if (key.match(/^[\*]/)) {
                    node.attributes[key] = {
                        type: 'directive',
                        value: node.attributes[key]
                    }
                } 
                else if (key.match(/^[\@]/)) {
                    node.attributes[key] = {
                        type: 'listener',
                        value: node.attributes[key]
                    }
                }
                else if (key.match(/^[\:]/)) {
                    node.attributes[key] = {
                        type: 'dynamic',
                        value: node.attributes[key]
                    }
                }
            }
        }
        if (node.text) {
            if (node.text.trim().match(/^\{[\s\S]*\}$/)) {
                node.text = {
                    type: 'dynamic',
                    value: node.text
                }
            }
        }
        if (node.children) {
            node.children.forEach(handle)
        }
    }
    handle(vm)
    return vm
}

const isEqual = (a, b) => {
    // 类型为基本类型时,如果相同,则返回true
    if (a === b) return true
    if (typeof a === 'object' && typeof b === 'object' && Object.keys(a).length === Object.keys(b).length) {
        // 类型为对象并且元素个数相同
        // 遍历所有对象中所有属性, 判断元素是否相同
        for (const key in a) {
            if (a.hasOwnProperty(key)) {
                if (!isEqual(a[key], b[key])) {
                    // 对象中具有不相同属性 返回false
                    return false
                }
            }
        }
    } else if (Array.isArray(a) && Array.isArray(b) && a.length === b.length) {
        // 类型为数组并且数组长度相同
        for (let i = 0; i < a.length; i++) {
            if (!isEqual(a[i], b[i])) {
                // 如果数组元素中具有不相同元素, 返回false
                return false
            }
        }
    } else {
        // 其它类型, 均返回false
        return false
    }
    // 走到这里, 说明数组或者对象中所有元素都相同, 返回true
    return true
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

        this.reactive(props, data, computed, methods)

        this.render(this.state)
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

    setState(updateState) {
        if (typeof updateState === 'object') {
            Object.assign(this.state, updateState)
            this.render(updateState)
        }
    }

    /* private */reactive(props, data, computed, methods) {
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
        this.vm = analyze(this.template())
    }

    // 根据state变化计算可变节点
    // /* private */async diff(updateState) {
    //     if (typeof updateState === 'undefined') {
    //         updateState = {}
    //         Object.entries(this.state).forEach(([key, value]) => {
    //             if (!isEqual(value, this.cache[key])) {
    //                 updateState[key] = value
    //                 this.cache[key] = value
    //             }
    //         })
    //     }
    //     return updateState
    // }

    /* private */async render(updateState) {
        // updateState = await this.diff(updateState)
        console.log(this.vm)
        console.log('--------------render--------------')
        const html = renderHTML(this.vm.children)
        console.log(html)
        // updateState.
        // nodes.forEach(node => {
        //     const { selector, attribute, value } = node
        //     this.$(selector)[attribute] = value
        // })
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
