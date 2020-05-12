// 历史记录
export default [
    {
        title: {
            type: 'string',
            default: '首页',
            required: true
        },
        path: {
            type: 'string',
            default: '/',
            required: true
        },
        slug: {
            type: 'string',
            default: 'homePage',
            required: true
        },
        data: 'object' // type
    }
]