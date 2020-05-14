import { attrs } from '../utils/index.js'

const patterns = {
    template: /\`([\s\S]*)\`/,
    removeSpace: /([\>\<])\s+/g,
    startTag: /\<\s*([a-z]+)([\s\S]*)\/\>/,
    endTag: /\<\/[^\>]+\>/,
    shutTag: /\<{1}[^\<]+\/\>/,
    expression: /\$\{+[^\}]+\}+/,
    text: /\<([a-z]+>)[\s\S]+/,
}

export default class XML {
    constructor(template) {
        this.template = template
            .replace(patterns.removeSpace, (_, $1) => $1)
            .replace(/\s+/g, ' ')
    }
    // 
    toJSON() {
        const root = {
            children: []
        }

        const parents = [root]
        // console.log(this.template)
        this.template.split(/\>/).forEach(item => {
            console.log(item)
            const patterns = {
                startTag: /^\s*[\<]\s*(\S+)(\s*)$/,
                shutTag: /^\s*[\<]\s*(\S+)(\s*)[\/]$/,
                endTag: /^\s*[\<]\s*[\/](\S+)\s*$/,
            }
            Object.entries(patterns).forEach(([tag, re]) => {
                const matches = item.match(re)
                if (matches) {
                    switch (tag) {
                        case 'startTag':
                        case 'shutTag':
                            const ele = {
                                children: [],/*  */
                                attributes: attrs(matches[2], true)
                            }

                            parents[0].children.push({ [matches[1]]: ele })
                            tag === 'startTag' && parents.unshift(ele)
                            break
                        case 'endTag':
                            parents.shift()
                            break
                        default:
                            parents[0].children.push(matches[1])
                    }
                }
            })
        })
        return root

        // 
    }
}
