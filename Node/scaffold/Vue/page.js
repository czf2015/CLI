module.exports = (page, components) => 
`<template>
    <Layout :loading="loading">
        <component v-for="item in list" :key="item.id || item.type" :is="item.componentName" :data="item.data" />
    </Layout>
</template>


<script>
    import { asyncData } from "@/plugins/axios";
    import adapter from "./adapter";
    // import validator from "./validator";
    import Layout from "@/layouts/default";

    export default {
        components: {
            Layout,
${components.map(component => typeof component === 'string'
    ? `
            ${component}: () => import('./business/${component}'),`
    : `
            ${component.name}: () => import('./business/${component.name}'),`
).join('')}
        },

        data() {
            return {
            list: [],
                loading: false,
            };
        },

        methods: {
        },

        created() {
            const path = location.pathname.includes("preview")
                ? "/${page}_preview.json"
                : "/${page}.json";
            this.loading = true;
            asyncData(path).then(data => {
                this.loading = false;
                this.list = adapter(data.block.root.childBlocks);
            });
        }
    };
</script>`