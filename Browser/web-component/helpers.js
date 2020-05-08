// 数据监听
export function observe(data = {}) {
    return new Proxy(data, {
        set: (target, key, receiver) => {
            const val = Reflect.set(target, key, receiver)
            this.shadow.innerHTML = this.template;
            this.listen();
            return val;
        }
    })
}

// 双向数据绑定不适合内部嵌套其他组件的情况，当state改变时会导致嵌套的组件重新渲染
export class AbstractComponent extends HTMLElement {
    constructor() {
        super();

        this.shadow = this.attachShadow({ mode: 'closed' });

        // 双向数据绑定
        const props = {}
        const atrributes = this.getAttributeNames()
        atrributes.forEach(attribute => props[attribute] = this.getAttribute(attribute))
        this.props = observe.bind(this)(props)
        this.state = observe.bind(this)(this.data)

        this.shadow.innerHTML = this.template;
        this.listen()
    }

    get template() {}

    get data() {}

    // 监听
    listen() {}
}

// 
export class AbstractShadow extends HTMLElement {
    constructor() {
        super();

        this.shadow = this.attachShadow({ mode: 'closed' });

        this.shadow.innerHTML = this.template;
        this.listen()
    }

    get template() {}

    get data() {}

    // 监听
    listen() {}
}

export class Route extends AbstractShadow {
    get template() {
        const path = this.getAttribute('path')
        const tag = this.getAttribute('tag')
        return window.location.pathname === path ? `<${tag}></${tag}>` : ''
    }
}
