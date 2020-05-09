// 双向数据绑定不适合内部嵌套其他组件的情况，当state改变时会导致嵌套的组件重新渲染
export class AbstractShadow extends HTMLElement {
    constructor() {
        super();

        this.shadow = this.attachShadow({ mode: 'closed' });

        // props属性
        const props = {}
        const atrributes = this.getAttributeNames()
        atrributes.forEach(attribute => props[attribute] = this.getAttribute(attribute))

        // 数据视图绑定
        this.state = new Proxy({ ...this.data(), ...props }, {
            set: (target, key, receiver) => {
                const retVal = Reflect.set(target, key, receiver)
                this.shadow.innerHTML = this.render(target)
                this.listen();
                return retVal;
            }
        })

        // 单向传递
        this.props = new Proxy(props, {
            set: (target, key, receiver) => {
                const retVal = Reflect.set(target, key, receiver)
                Object.assign(this.state, target)
                return retVal;
            }
        })

        this.shadow.innerHTML = this.render(this.state);
        this.listen()
    }

    render(state) {}

    data() {}

    // 监听
    listen() {}
}

export function isRoute(path) {
    const paths = (window.location.pathname || '/').split('/')
    const slugs = path.split('/')
    if (slugs.length !== paths.length) {
        return false
    }
    for (let i = 0; i < slugs.length; i++) {
        if (slugs[i].includes(':')) {
            return true
        } else {
            if (slugs[i] !== paths[i]) {
                return false
            }
        }
    }
    return true
}

export class BrowserRoute extends AbstractShadow {
    render({ path, tag }) {
        return isRoute(path) ? `<${tag}></${tag}>` : ''
    }
}
