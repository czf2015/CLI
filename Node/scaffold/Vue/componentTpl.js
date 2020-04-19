module.exports = (component, partials) => {
    const cls = component.replace(/[A-Z]/, c => c.toLowerCase())

    if (typeof partials === 'undefined') {
        return (
`<template>
    <div class="${cls}">
    </div>
</template>


<script>
export default {
    props: {
        data: {
            type: Object,
            // required: true
        }
    },

    data() {
        return {
        }
    },

    computed: {
    },

    mounted() {
    }
}
</script>


<style scoped>
.${cls} {
}
</style>`
        )
    }

    return (
`<template>
    <dic class="${cls}">
    </dic>
</template>


<script>
${partials
    .map(partial => {
        const componentName = typeof partial === 'string' ? partial : partial.name
        return `import ${componentName} from './partials/${componentName}'`
    }).join('\n')
}

export default {
    components: {
${partials
    .map(partial => {
        const componentName = typeof partial === 'string' ? partial : partial.name
        return `        ${componentName},`
    }).join('\n')
}
    },

    props: {
        data: {
            type: Object,
            // required: true
        }
    },

    computed: {
    },

    methods: {
    },

    mounted() {
    }
};
</script>


<style scoped>
.${cls} {
}
</style>`
        )
}
