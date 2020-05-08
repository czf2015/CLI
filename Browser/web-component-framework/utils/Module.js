export default (moduleDir, pattern = /\.js$/) => {
    const modulesFiles = require.context(moduleDir, true, pattern)

    return modulesFiles.keys().reduce((modules, modulePath) => {
        const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
        const value = modulesFiles(modulePath)
        modules[moduleName] = value.default
        return modules
    }, {})
}