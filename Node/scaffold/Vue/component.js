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

        mounted() {
        }
    }
</script>


<style scoped>
    .${cls} {
    }
</style>`
        )
    } else {
        return (
`<template>
    <dic class="${cls}">
        <component v-for="item in list" :key="item.id || item.type" :is="item.componentName" :data="item.data" />
    </dic>
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
                // required: true
            }
        },

        computed: {
            list() {
                return adapter(this.data.childBlocks)
            }
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
}
