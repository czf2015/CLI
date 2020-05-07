//去掉html标签
function removeHtmlTab(tab) {
    return tab.replace(/<[^<>]+?>/g, '');//删除所有HTML标签
}

//普通字符转换成转意符
function html2Escape(sHtml) {
    const arrEntities = { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }
    return sHtml.replace(/[<>&"]/g, (c) => arrEntities[c]);
}

//转意符换成普通字符	
function escape2Html(str) {
    const arrEntities = { 'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"' };
    return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, (all, t) => arrEntities[t]);
}

// &nbsp;转成空格	
function nbsp2Space(str) {
    const arrEntities = { 'nbsp': ' ' };
    return str.replace(/&(nbsp);/ig, (all, t) => arrEntities[t])
}

//回车转为br标签	
function return2Br(str) {
    return str.replace(/\r?\n/g, "<br />");
}

//去除开头结尾换行,并将连续3次以上换行转换成2次换行
function trimBr(str) {
    return str
        .replace(/((\s|&nbsp;)*\r?\n){3,}/g, "\r\n\r\n") // 限制最多2次换行
        .replace(/^((\s|&nbsp;)*\r?\n)+/g, '') // 清除开头换行
        .replace(/((\s|&nbsp;)*\r?\n)+$/g, '') // 清除结尾换行
}

// 将多个连续空格合并成一个空格
function mergeSpace(str) {
    return str.replace(/(\s|&nbsp;)+/g, ' ')
}