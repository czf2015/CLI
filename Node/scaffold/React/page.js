module.exports = (page) => 
`import React, { useState, useEffect } from 'react';
import { asyncData } from '@/plugins/axios';
import Layout from '@/layouts/default';
import adapter from './adapter';


export default ({ location, match }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const api = \`${page}\/\${location.search.includes('?!preview') ? 'preview!' : ''}\${match.params.page}.json\`

        asyncData(api)
            .then((res) => {
                if (res.redirect) {
                    window.location.href = res.redirect
                } else {
                    setLoading(false)
                    setData(adapter(res.block.root.childBlocks))
                }
            })
            // .catch((err) => { window.location.href = '/' })
    }, [])

    return (
        <Layout hidden={loading}>
            {data.map(({ id, type, Component, data }) => <Component data={data} key={id || type} />)}
        </Layout>
    )
}`