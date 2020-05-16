export const getAttributes = (attrs) => {
    const attributes = {}
    attrs.trim().replace(/[\'\"]/g, '').split(/\s+/)
        .forEach(attr => {
            const [attribute, value] = attr.split('=')
            attributes[attribute] = value
        })
    return attributes
}

export const setAttributes = (attributes) =>
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
    // 先区分tag property 
    // 再处理children 
    // const words = text.split(/[\b]*)/g)
    // for (let i = 0; i < words.length; i++) {
    //     const word = words[i]
    //     const p = word.indexOf('=')
    //     if (p == -1) {
    //         return word.replace(/[><\/]*/g, '')
    //     } else {
    //         return [word.slice(0, p), word.slice(p)]
    //     }
    // }
    console.log(xml)
}