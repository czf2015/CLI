import Model from "./Model.js";

export default {
    ...Model,
    display: '', // d
    float: '', // none | left | right | inherit
    position: '', // static | relative | absolute | fixed
    top: '', // t 
    left: '', // l
    bottom: '', // b
    right: '', // r
    clip: '', // 裁剪绝对定位元素
    margin: '0', // m
    padding: '0', // p
    width: '0', // w
    height: '0', // h
    font: {
        family: '',
        varant: '',
        size: '',
        weight: '',
        stretch: '',
        default: 'inherit',
    },
    flex: {
        direction: '',
        justify: '',
        align: {
            item: '',
            content: '',
            self: ''
        },
        grow: '0',
        shrink: '1',
        basis: '',
        wrap: '',
        flow: ''
    },
    text: {
        indent: '',
        space: {
            word: '',
            letter: '',
            white: ''
        },
        break: {
            word: '',
            line: '',
            overflow: '',
        },
        mode: '',
        orientation: '',
        direction: '',
        lineHeight: '',
        align: '',
        vertical: '',
        transform: '',
        decoration: '',
        shadow: '',
    },
    background: { // bg
        color: '',
        image: '',
        position: '',
        repeat: '',
        attachment: '',
        origin: '',
        clip: '', // 
        size: '', // contain
        default: 'transparent'
    },
    border: '', // bd
    outline: '',
    color: 'inherit', // c
    opacity: '1', // 透明度
    visibility: 'visible', // 隐藏元素时会占据页面上的空间
    transform: 'scale(1, 1)', // 横纵缩放比
    level: '0', // z-index 层级
    animation: {
        name: '',
        duration: '',
        timingFunction: '',
        delay: '',
        iterationCount: '',
        direction: '',
        fillMode: '',
        playState: ''
    },
    transition: {
        delay: '',
        duration: '',
        property: '',
        timingFunction: ''
    }
}