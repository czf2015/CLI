import XML from '../../plugins/XML.js'

const patterns = {
    template: /\`([\s\S]*)\`/,
    removeSpace: /([\>\<])\s+/g,
    startTag: /\<\s*([a-z]+)([\s\S]*)\/\>/,
    endTag: /\<\/[^\>]+\>/,
    shutTag: /\<{1}[^\<]+\/\>/,
    expression: /\$\{+[^\}]+\}+/,
    text: /\<([a-z]+>)[\s\S]+/,
}

class Component {
    template() {
        // computed
        return (
            `<div>
                <input type="text" placeholder="hello" :value="inputVal" :class="theme" @focus="pop" />
                <button type="button"> add </button>
                <ul>
                    <li :for="item in list" :key="item"> { item } </li>
                </ul>
            </div>`
        );
    }
}

const component = new Component()
()
const template = component.template.toString()
    .match(patterns.template)[1]
    // .replace(/\>\s*\</g, _ => _.replace(/\s+/g, ''))
    .replace(/\s*=\s*/g, '=') // 去除等号两边空格
    .replace(/\>\s*(\{[\s\S]*\})\s*\</g, _ => _.replace(/\s+/g, '')) // 去除{}空格


console.log(template)


// const xml = new XML(template)

// xml.toJSON()