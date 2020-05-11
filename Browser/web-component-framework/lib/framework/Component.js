// 双向数据绑定不适合内部嵌套其他组件的情况，当state改变时会导致嵌套的组件重新渲染
export class Component extends HTMLElement {
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
                this.shadow.innerHTML = this.render(this.state);
                this.listen()
                return retVal;
            }
        })

        // 单向传递 props可传递数据、函数及更复杂的对象
        this.props = new Proxy(props, {
            set: (target, key, receiver) => {
                const retVal = Reflect.set(target, key, receiver)
                Object.assign(this.state, target)
                return retVal;
            }
        })   

        this.shadow.innerHTML = this.render(this.state);
        this.listen()

        this.once()
    }

    
    render(state) {}
    
    data() {}
    
    // 每次状态更新，需要重新绑定
    listen() {}

    // 仅初始化完成时执行一次
    once() {}

    $(selector) {
        return this.shadow.querySelector(selector)
    }
}