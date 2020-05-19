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