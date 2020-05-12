import { Component } from '../lib/framework/index.mjs'

const attrs = properties => Object.entries(properties)
    .map(([attribute, value]) => `${attribute}="${value}"`)
    .join(' ')

export default class Slot extends Component {
    render({ name, content }) {
        return (
            `<template ${attrs({ name })}}>
                ${content}
            </template>`
        )
    }
}