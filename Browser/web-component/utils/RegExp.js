export default {
    url: /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/,
    email: /w+([-}.]w+)*@w+([-.]w+)*.w+([-.]w+)*/,
    xml: /<(.*)>.*|<(.*)\/>/, 
    upper: /^[A-Z]+$/,
    lower: '',
    QQ: /[1-9][0-9]{4,}/, // 腾讯QQ号从10000开始
}

function isRegExp(value) {
    return Object.prototype.toString.call(value) === '[object RegExp]'
}


