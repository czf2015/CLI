export default class Time {
    constructor(time = Date.now) {
        this.time = time
    }

    // 转化成各时区时间
    parse() { }
    
    // 格式化
    format() { }
}