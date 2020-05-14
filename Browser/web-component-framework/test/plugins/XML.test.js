import XML from '../../plugins/XML.js'
import { attrs } from '../utils/index.mjs'


const render = ({ inputVal, list }) => {
    // computed
    return (
        `<div>
            <input type="text" placeholder="hello" value = ${inputVal} />
            <button type="button">add</button>
            <ul>
                ${list.map(item => `<li>${item + 2}</li>`)}
            </ul>
        </div>`
    );
}

const patterns = {
    template: /\`([\s\S]*)\`/,
    removeSpace: /([\>\<])\s+/g,
    startTag: /\<\s*([a-z]+)([\s\S]*)\/\>/,
    endTag: /\<\/[^\>]+\>/,
    shutTag: /\<{1}[^\<]+\/\>/,
    expression: /\$\{+[^\}]+\}+/,
    text: /\<([a-z]+>)[\s\S]+/,

}

const template = render.toString()
    .match(patterns.template)[1]
    .replace(/\s*=\s*/g, '=') // 去除等号两边空格
    .replace(/\$\{+[^\}]+\}+/g, c => c.replace(/\s+/g, '')) // 去除${}空格
    .replace(/\`/g, '')
// .replace(/\<\>[\s]*\</g, '"children": [{')
// .replace(/\<([a-z]+)/g, (_, $1) => `{"${$1}":{`)



const xml = new XML(template)

xml.toJSON()