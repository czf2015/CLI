module.exports = (business) =>
`const components = {
${business
    .map(component => {
        const componentName = typeof component === 'string' ? component : component.name
        return `    ${componentName}: {
        componentName: '${componentName}',
        convert(data, childBlocks) {
            return {...data, childBlocks}
        }
    },`
    }).join('\n')
}
}


export default (data, method = 'get') => method === 'get'
    ? data.map(item => {
        const { id, type, data, childBlocks = [] } = item
        const { componentName, convert } = components[type]
        return { id, type, componentName, data: convert(data, childBlocks) }
    })
    : [
        {
            // 
        }
    ]`