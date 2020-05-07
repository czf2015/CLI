import Model from './Model'

export default {
    ...Model,
    type: '', // 类型
    styles: {}, // 样式
    data: undefined, // 数据 any
    // 事件处理 {type, payload}
    handle(event) {
        
    },
    // 具名插槽 默认插槽
    slot({name, data}) {
        return {
            get name() {
                // 
                return data
            }
        }[name]
    },
    components: [], // 子组件 id
}

{/* <Demo data={data} handle={handle} styles={style} components={components}>{slot}</Demo> */}