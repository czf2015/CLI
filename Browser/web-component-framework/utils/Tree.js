const { deepCopy } = require('./Object')


function generate(levels) {
    const _levels = deepCopy(levels)
    let count = 0
    function _generate(pid) {
        for (let i = 0; i < _levels.length; i++) {
            if (_levels[i].pid == pid.split('/')[0]) {
                _levels[i].pid += `/${pid.split('/')[1] || 0}`
                _levels[i].id += `/${++count}`
                _generate(_levels[i].id)
            }
        }
    }
    _generate('root')
    return _levels.map(item => {
        item.pid = item.pid.split('/')[1]
        item.id = item.id.split('/')[1]
        return item
    })
}


function convert(nodes, parent = { id: 0 }) {
    if (!parent.children) {
        parent.children = []
    }
    const children = []
    nodes.forEach(node => {
        if (node.pid == parent.id) {
            parent.children.push(node)
        } else {
            children.push(node)
        }
    })
    parent.children.forEach(item => {
        convert(children, item)
    })
    return parent
}


function revert(tree) {
    const items = []
    function traverse(tree) {
        const _tree = deepCopy(tree)
        delete _tree.children
        items.push(_tree)
        tree.children.forEach(item => traverse(item))
    }
    traverse(tree)
    return items.filter(item => item.id != 0)
}


module.exports = {
    generate,
    convert,
    revert,
}