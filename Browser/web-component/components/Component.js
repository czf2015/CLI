export default class Component extends HTMLElement {
    constructor() {
        super();

        this.shadow = this.attachShadow({ mode: 'closed' });

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