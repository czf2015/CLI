
// docs: [HTMLElement](https://www.w3school.com.cn/xmldom/dom_htmlelement.asp)

class Component extends HTMLElement {
    constructor() {
        super();
        this.init()
        this.create()
        this.mount()
    }

    // @return { data, methods }
    async init() {
        return {
            data: {},
            methods: {
                fetch() { }
            }
        }
    }

    /* private */create() {
        const { data, methods } = this.init()

        // 创建
        this.shadow = this.attachShadow({ mode: 'closed' });

        this.state = data
        this.methods = methods

        const template = this.template()
            .replace(/\>\s*\</g, _ => _.replace(/\s+/g, ''))
            .replace(/\s*=\s*/g, '=')
            .replace(/\>\s*(\{[\s\S]*\})\s*\</g, _ => _.replace(/\s+/g, '')) // 去除{}空格

        this.directives(template)
        this.viewModel(template)
        this.listeners(template)

        const props = {}
        const atrributes = this.getAttributeNames()
        atrributes.forEach(attribute => props[attribute] = this.getAttribute(attribute))

        this.props = new Proxy(props, {
            set: (target, key, receiver) => {
                const retVal = Reflect.set(target, key, receiver)
                this.update({ key: receiver })
                return retVal;
            }
        })

        this.setState(props)

        // this.shadow.innerHTML = template
    }

    mount() { }

    update(data) {
        this.setState(data)
    }

    template(state) { }

    setState(data) {
        if (typeof data === 'object') {
            Object.assign(this.state, data)
            this.render()
        }
    }

    /* private */$(selector, isAll = false) {
        return isAll ? this.shadow.queryAllSelector(selector) : this.shadow.querySelector(selector)
    }

    /* private */directives(template) {
        let temp
        const title = 'title'
        const [_, directive, value] = template.match(/\s+\*([a-zA-Z\_]+)=\"{1}([^\"]+)\"{1}/) || []
        console.log({ directive, value })
        switch (directive) {
            case 'for':
                console.log('------directive: for---------')
                // const [list, item] = value.trim().split(/\s+in\s+/g)
                // debugger
                temp = [value].map(item => {
                    return template.replace(/\s*\*for=\"([^\"]+){1}\"{1}/, '')
                        .replace(/\>{1}\s*\{([\s\S]*)\}\s*\<{1}/, ($, $1) => `>${eval($1)}<`)
                        .replace(/\s*\:key=\"{1}([\s\S]*)\"{1}/, ($, $1) => ` key="${eval($1)}"`)
                })
                console.log(temp)
                break
            case 'if':
                console.log('------directive: if---------')
                temp = template.replace(/\s*\*if=\"([^\"]+){1}\"{1}/, value ? '' : ' style="display: none;"')
                console.log(temp)
                break
            default:
                break
        }
    }

    /* private */viewModel(template) {
        const [_, attribute, value] = template.match(/\s+\:([a-zA-Z\_]+)=\"{1}([^\"]+)\"{1}/) || []
        console.log({ attribute, value })
    }

    /* private */listeners(template) {
        const [_, event, handler] = template.match(/\s+\@([a-zA-Z\_]+)=\"{1}(\S+)\"{1}/) || []
        console.log({ event, handler })
    }

    // 根据state变化计算可变节点
    /* private */diff() {
    }

    /* private */render() {
        // this.shadow.innerHTML = template
        // return this.template()
        //     // .replace(/\>\s*\</g, _ => _.replace(/\s+/g, ''))
        //     .replace(/\s*=\s*/g, '=') // 去除等号两边空格
        // // .replace(/\>\s*(\{[\s\S]*\})\s*\</g, _ => _.replace(/\s+/g, '')) // 去除{}空格
    }
}

const customElementRegister = (customs) => Object.entries(customs)
    .forEach(custom => window.customElements.define(...custom))

const isRoute = (path) => {
    const paths = (window.location.pathname || '/').split('/')
    const slugs = path.split('/')
    if (slugs.length !== paths.length) return false
    for (let i = 0; i < slugs.length; i++) {
        if (slugs[i].includes(':')) return true
        if (slugs[i] !== paths[i]) return false
    }
    return true
}

class Router extends Component {
    template({ routes }) {
        return (
            `<route *for="routes" *if="isRoute(.path)" :key=".tag">{.title}</route>`
        )
    }
}
