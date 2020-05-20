export const getAttrs = (attrs) => {
    const attributes = {}
    attrs.trim().replace(/[\'\"]/g, '').split(/\s+/)
        .forEach(attr => {
            const [attribute, value] = attr.split('=')
            attributes[attribute] = value
        })
    return attributes
}

export const setAttrs = (attributes) =>
    Object.entries(attributes)
        .map(([attribute, value]) => `${attribute}="${value}"`)
        .join(' ')


export const renderHTML = (node) => {
    const h = ({ render, params, text }) => render ? render(params) : text || ''
    if (Array.isArray(node)) {
        return node.map(renderHTML).join('')
    } else {
        const { tag, attributes, children } = node
        return `<${tag} ${attrs(attributes)}>${children ? renderHTML(children) : h(node)}</${tag}>`
    }
}

export const parseXML = (xml) => {
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
                tags[tags.length - 1].children.push({
                    tag: matches[1],
                    attributes: getAttrs(matches[2].trim()),
                })
            } else {
                tags[tags.length - 1].children.push({
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
                tags[tags.length - 1].children.push({
                    tag: matches[1],
                    attributes: getAttrs(matches[2].trim()),
                    text: matches[3]
                })
            } else {
                tags[tags.length - 1].children.push({
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
            const tag = tags.pop()
            tags[tags.length - 1].children.push(tag)
            return true
        }
    }

    const matchType4 = (fragment) => {
        const pattern = /^\<*(\S+)\s*([^\/\>]*)$/
        const matches = fragment.match(pattern)
        if (matches) {
            if (matches[2].trim()) {
                tags.push({
                    tag: matches[1],
                    attributes: getAttrs(matches[2].trim()),
                    children: []
                })
            } else {
                tags.push({
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

// 参考: https://github.com/livoras/simple-virtual-dom
export const setAttribute = (node, key, value) => {
    switch (key) {
        case 'style':
            node.style.cssText = value
            break
        case 'value':
            const tagName = node.tagName || ''
            if (['input', 'textarea'].includes(tagName.toLowerCase())) {
                node.value = value
            } else {
                node.setAttribute(key, value)
            }
            break
        default:
            node.setAttribute(key, value)
            break
    }
}
// 同上
export class Element {
    constructor(tagName, props, children) {
        this.tagName = tagName
        this.props = props
        this.children = children
    }

    render() {
        const el = document.createElement(this.tagName) // 根据tagName构建

        // 设置节点的DOM属性
        Object.keys(this.props).forEach(propName => {
            return setAttribute(el, propName, this.props[propName])
        })

        if (this.children) {
            this.children.forEach((child) => {
                const childEl = child instanceof Element
                    ? child.render() // 如果子节点也是虚拟DOM，递归构建DOM节点
                    : document.createTextNode(child) // 如果字符串，只构建文本节点
                el.appendChild(childEl)
            })
        }

        return el
    }

    setAttribute(key, value) {
        Object.assign(this.props, { [key]: value })
    }

    getAttribute(key) {
        return this.props[key]
    }
}
