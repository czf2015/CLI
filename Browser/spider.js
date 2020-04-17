
// [向前查找和向后查找](https://blog.csdn.net/libingxin/article/details/7840998)
// (?:str)   非捕获组
// (?=str) 肯定式向前查找
// (?!str) 否定式向前查找
// (?<=str) 肯定式向后查找
// (?<!str) 否定式向后查找

function extract(ele, attr) {
    function _extract(ele, attr) {
        let result = ele
        if (typeof attr === 'string') {
            const attrs = attr.split('.')
            attrs.forEach(item => result = result[item])
        }
        return result
    }

    return Array.isArray(attr) ? attr.map(item => _extract(ele, item)) : _extract(ele, attr)
}


function crawl(selector, attribute, pattern) {
    const result = []
    const elements = document.querySelectorAll(selector)
    for (let i = 0; i < elements.length; i++) {
        result.push(extract(elements[i], attribute))
    }
    if (typeof pattern !== 'undefined') {
        result = result.filter(item => item.match(pattern))
    }
    return result
}

// 敏感词检测
function detect(url, checks) {
    const result = []
    fetch(url)
        .then(res => res.text())
        .then(text => {
            checks.forEach(check => {
                if (text.includes(check)) {
                    result.push(check)
                }
            })
            if (result.length > 0) {
                console.warn(`${url}存在${result}`);
            } else {
                console.info(`${url}不存在${checks}`);
            }
        })
}


function supervise(selector, attribute, checks, pattern) {
    crawl(selector, attribute, pattern).forEach(url => detect(url, checks))
}


function run(task, time) {
    console.clear()
    task()
    if (typeof time === 'number') {
        setInterval(task, time)
    }
}


// usage: 
const selector = 'a'
const attribute = 'href'
const checks = ['腾讯', '微云', 'tencent', '王者荣耀']
const pattern = /\/\/\:yun.ccb.com/
const time = 1000 * 60 * 10

function task() {
    supervise(selector, attribute, checks, pattern)
}

run(task, time)
