const fs = require('fs')
const mkdirp = require('mkdirp')
const componentTpl = require('./componentTpl')

const [category, component, ...partials] = process.argv.slice(2)
const relative = `${__dirname}/../src/components/${category}`

const h = (...components) => components.reduce((page, component) => `${page}-${component.replace(/[A-Z]/, c => c.toLowerCase())}`)

if (partials.length > 0) {
    mkdirp(`${relative}/${component}/partials`, (err) => {
        fs.writeFile(`${relative}/${component}/index.vue`, componentTpl(component, partials), console.log)
        partials.forEach(partial => fs.writeFile(`${relative}/${component}/partials/${partial}.vue`, componentTpl(h(component, partial)), console.log))
    })
} else {
    mkdirp(relative, (err) => {
        fs.writeFile(`${relative}/${component}.vue`, componentTpl(component), console.log)
    })
}