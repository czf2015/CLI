export const attrs = (properties, mode = false) => {
    if (mode) {
        const attributes = {}
        properties.trim().replace(/[\'\"]/g, '').split(/\s+/)
            .forEach(property => {
                const [attribute, value] = property.split('=')
                attributes[attribute] = value
            })
        return attributes
    } else {
        return Object.entries(properties)
            .map(([attribute, value]) => `${attribute}="${value}"`)
            .join(' ')
    }
}

export const html = (raw, mode = false) => {
    if (mode) {
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

    } else {
        const h = ({ render, params, text }) => render ? render(params) : text || ''
        if (Array.isArray(raw)) {
            return raw.map(html).join('')
        } else {
            const { tag, properties, children } = raw
            return `<${tag} ${attrs(properties)}>${children ? html(children) : h(raw)}</${tag}>`
        }
    }
}