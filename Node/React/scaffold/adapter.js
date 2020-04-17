module.exports = (business, partials = 'partials') =>
`${business.map(component => typeof component === 'string'
? `import ${component} from './${partials}/${component}'`
: `import ${component.name} from './${partials}/${component.name}'`).join('\n')}

const components = {
${business.map(component => typeof component === 'string'
? `    ${component}: {
        Component: ${component},
        convert(data, childBlocks) {
            return {...data, childBlocks}
        }
    },`
: `    ${component.name}: {
        Component: ${component.name},
        convert(data, childBlocks) {
            return {...data, childBlocks}
        }
    },`).join('\n')}
}


export default (data, method = 'get') => method === 'get'
    ? data.map(item => {
        const { id, type, data, childBlocks = [] } = item
        const { Component, convert } = components[type]
        return { id, type, Component, data: convert(data, childBlocks) }
    })
    : [
        {
            // 
        }
    ]`