module.exports = categories => 
`<template>
    <component :is="name">{{name}}</component>
</template>


<script>
export default {
    components: {
        Demo: () => import('./Demo'),
${categories
    .map(({category, children}) => children
        .map(componentName => `        ${componentName}: () => import('@/components/${category}/${componentName}'),`)
        .join('\n')
    )
    .join('\n')
}
    },

    props: {
        name: {
            type: String,
            default: 'Demo'
        }
    },
}
</script>`