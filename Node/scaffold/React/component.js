module.exports = (component, partials) => {
    const cls = component.replace(/[A-Z]/, c => c.toLowerCase())

    if (typeof partials === 'undefined') {
        return (
`import React, { useState } from "react";
// import "./index.less";
// import {protocol} from '@/config/apis'

export default ({ data }) => {
    return (
        <div className="${cls}">
        </div>
    );
}`
        )
    } else {
        return (
`import React, { useState } from "react";
// import "./index.less";
import adapter from './adapter';

export default ({ data }) => {
    return (
        <div className="${cls}">
            {adapter(data).map(({ id, type, Component, data }) => <Component data={data} key={id || type} />)}
        </div>
    );
}`
        )
    }
}
