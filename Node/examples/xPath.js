
//根据指定的XPATH表达式查找满足条件的所有节点
//@param xmldoc 执行查找的节点
//@param sXpath xpath的表达式
function selectNodes(xmldoc, sXpath) {
    if (window.ActiveXObject) {
        //IE浏览器     
        return xmldoc.selectNodes(sXpath);
    } else if (window.XPathEvaluator) {
        //FireFox类浏览器       
        const xpathObj = new XPathEvaluator();

        if (xpathObj) {
            const result = xpathObj.evaluate(sXpath, xmldoc, null, XPathResult.ORDERED_NODE_ITEARTOR_TYPE, null);
            const nodes = [];
            let node;
            while ((node = result.iterateNext()) != null) {
                nodes.push(node);
            }
            return nodes;
        } else {
            return null;
        }
    } else {
        return null;
    }
}

//根据指定的XPATH表达式查找满足条件的第一个节点
//@param xmldoc 执行查找的节点
//@param sXpath xpath的表达式
function selectSingleNode(xmldoc, sXpath) {
    if (window.ActiveXObject) {
        //IE浏览器        
        return xmldoc.selectSingleNode(sXpath);
    } else if (window.XPathEvaluator) {
        //FireFox类浏览器        
        const xpathObj = new XPathEvaluator();
        if (xpathObj) {
            const result = xpathObj.evaluate(sXpath, xmldoc, null, XPathResult.ORDERED_NODE_ITEARTOR_TYPE, null);
            return result.singleNodeValue;
        } else {
            return null;
        }
    } else {
        return null;
    }
}

// ————————————————
// 版权声明：本文为CSDN博主「AkkZh」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
// 原文链接：https://blog.csdn.net/akkzhjj/article/details/17591449