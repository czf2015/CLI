module.exports = (page, component, partials) => {
    const id = `${page}-${component.replace(/[A-Z]/, c => c.toLowerCase())}`

    if (typeof partials === 'undefined') {
        return (
`<template>
    <section id="${id}">
    </section>
</template>


<script>
    // import  from ''

    export default {
        props: {
            data: {
                type: Object,
                required: true
            }
        },

        data() {
            return {
            }
        },

        mounted() {
        }
    }
</script>


<style scoped>
    #${id} {
    }
</style>`
        )
    } else {
        // 
        return (
`<template>
    <section id="${id}">
        <component v-for="item in list" :key="item.id || item.type" :is="item.componentName" :data="item.data" />
    </section>
</template>


<script>
    import adapter from "./adapter";

    export default {
        components: {
${partials.map(partial => typeof partial === 'string'
    ? `
            ${partial}: () => import('./partials/${partial}'),`
    : `
            ${partial.name}: () => import('./partials/${partial.name}'),`
).join('')}
        },

        props: {
            data: {
                type: Object,
                required: true
            }
        },

        computed: {
            list() {
                return adapter(this.data.childBlocks)
            }
        },

        mounted() {
        }
    }
</script>


<style scoped>
    #${id} {
    }
</style>`
        )
    }
}