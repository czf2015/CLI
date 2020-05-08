const {setProperty, getPropertyValue, removeProperty} = document.documentElement.style


export default {
    supports(property = '--a', value = 0) {
        return window.CSS && window.CSS.supports && window.CSS.supports(property, value)
    },
    variables: {
        set: setProperty, // 设置css全局变量--var
        get: getPropertyValue,
        remove: removeProperty
    }
}