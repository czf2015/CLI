// 双向数据绑定不适合内部嵌套其他组件的情况，当state改变时会导致嵌套的组件重新渲染
export default class Component extends HTMLElement {
    constructor() {
        super();

        this.shadow = this.attachShadow({ mode: 'closed' });

        // 双向数据绑定
        this.state = new Proxy({...this.props, ...this.data}, {
            set: (target, key, receiver) => {
                const val = Reflect.set(target, key, receiver)
                this.shadow.innerHTML = this.template;
                this.listen();
                return val;
            }
        })

        this.shadow.innerHTML = this.template;
        this.listen()
    }

    get template() {}

    get props() {
        const props = {}
        const atrributes = this.getAttributeNames()
        atrributes.forEach(attribute => props[attribute] = this.getAttribute(attribute))
        return props
    }

    get data() {}

    // 监听
    listen() {}
}