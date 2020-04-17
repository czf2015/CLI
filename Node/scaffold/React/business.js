module.exports = (page, component, partials) => {
    const id = `${page}-${component.replace(/[A-Z]/, c => c.toLowerCase())}`

    if (typeof partials === 'undefined') {
        return (
`import React, { useState } from "react";
// import "./index.less";
// import {protocol} from '@/config/apis'

export default ({ data }) => {
    return (
        <section id="${id}">
        </section>
    );
}`
        )
    } else {
        // 
        return (
`import React, { useState } from "react";
// import "./index.less";
import adapter from './adapter';

export default ({ data }) => {
    return (
        <section id="${id}">
            {adapter(data.childBlocks).map(({ id, type, Component, data }) => <Component data={data} key={id || type} />)}
        </section>
    );
}`
        )
    }
}