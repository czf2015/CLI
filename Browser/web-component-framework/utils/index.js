export const isType = (value, type) => typeof type === 'function'
    ? value instanceof type
    : typeof value === type

export const deepCopy = (oldObj) => {
    const list = []

    return function deepCopy(oldObj) {
        list.push(oldObj)

        const newObj = Array.isArray(oldObj) ? [] : {}

        for (const key in oldObj) {
            if (oldObj.hasOwnProperty(key)) {
                if (typeof oldObj[key] === 'object') {
                    if (list.find(item => item === oldObj[key])) {
                        console.log(`{ ${key}: [Circular] }`)
                        newObj[key] = oldObj[key]
                    } else {
                        newObj[key] = deepCopy(oldObj[key])
                    }
                } else {
                    newObj[key] = oldObj[key]
                }
            }
        }

        return newObj
    }(oldObj)
}

export const keyValues = (obj) =>
    Object.keys(obj).map(key => ({ key, value: obj[key] }))

export const keyValue = (raw) =>
    typeof raw === 'object' ? keyValues(raw)[0] : raw

export const format = (raw, fields, convert) => {
    const list = {}

    return function format(raw, fields, convert) {
        fields.forEach(field => {
            if (typeof list[field] === 'undefined') {
                list[field] = [raw]
            } else {
                list[field].push(raw)
            }
            for (const key in raw) {
                if (typeof raw[key] === 'object') {
                    if (Array.isArray(raw[key])) {
                        raw[key].forEach(item => item = format(item, [field], convert))
                    } else {
                        if (list[field].find(item => item === raw[key])) {
                            console.log(`{ ${key}: [Circular] }`)
                        } else {
                            raw[key] = format(raw[key], [field], convert)
                        }
                    }
                } else {
                    if (key === field) {
                        raw[key] = convert(raw[key])
                    }
                }
            }
        })

        return raw
    }(raw, fields, convert)
}

export const adapt = (raw, transform) => {
    const list = []

    return function adapt(raw, transform) {
        list.push(raw)

        if (Array.isArray(raw)) {
            raw.forEach(item => item = adapt(item, transform))
        } else {
            Object.keys(raw).forEach(oldKey => {
                const newKey = transform[oldKey] || oldKey

                if (newKey !== oldKey) {
                    raw[newKey] = raw[oldKey]
                    delete raw[oldKey]
                }

                if (typeof raw[newKey] === 'object') {
                    if (list.find(item => item === raw[newKey])) {
                        console.log(`{ ${newKey}: [Circular] }`)
                    } else {
                        raw[newKey] = adapt(raw[newKey], transform)
                    }
                }
            })
        }

        return raw
    }(raw, transform)
}

export const execute = (handle, task) => Array.isArray(task)
    ? task.map(handle)
    : handle(task)

export const contain = (source, target) => Object.keys(target)
    .every(key => source[key] === target[key])

export const integrate = async (rule, cause) => {
    const h = cause => rule.handle ? rule.handle(cause) : cause

    if (rule.prerequisites && rule.prerequisites.length > 0) {
        switch (rule.mode) {
            case 'serial':
                for (let i = 0; i < rule.prerequisites.length; i++) {
                    cause = await integrate(rule.prerequisites[i], cause)
                }
                return h(cause)
            case 'parallel':
            case 'select':
                const promises = rule.prerequisites.map(async (prerequisite) => await integrate(prerequisite, cause))
                const method = rule.mode === 'parallel' ? 'all' : 'race'
                return Promise[method](promises).then(h)
            default:
                throw `${rule.mode} is not one type of modes: serial, parallel, select`
        }
    } else {
        return h(cause)
    }
}

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

export function generate(levels) {
    const _levels = deepCopy(levels)
    let count = 0
    const _generate = (pid) => {
        for (let i = 0; i < _levels.length; i++) {
            if (_levels[i].pid == pid.split('/')[0]) {
                _levels[i].pid += `/${pid.split('/')[1] || 0}`
                _levels[i].id += `/${++count}`
                _generate(_levels[i].id)
            }
        }
    }
    _generate('root')
    return _levels.map(item => {
        item.pid = item.pid.split('/')[1]
        item.id = item.id.split('/')[1]
        return item
    })
}


export function convert(nodes, parent = { id: 0 }) {
    if (!parent.children) {
        parent.children = []
    }
    const children = []
    nodes.forEach(node => {
        if (node.pid == parent.id) {
            parent.children.push(node)
        } else {
            children.push(node)
        }
    })
    parent.children.forEach(item => {
        convert(children, item)
    })
    return parent
}


export function revert(tree) {
    const items = []
    const traverse = (tree) => {
        const _tree = deepCopy(tree)
        delete _tree.children
        items.push(_tree)
        tree.children.forEach(item => traverse(item))
    }
    traverse(tree)
    return items.filter(item => item.id != 0)
}