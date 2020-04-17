const adapterTpl = require(`${__dirname}/../adapter`)
const businessTpl = require(`${__dirname}/../business`)
const pageTpl = require(`${__dirname}/../page`)
const componentTpl = require(`${__dirname}/../component`)
const raw = require(`${__dirname}/${process.argv[2]}.json`)
const mkdirp = require('mkdirp')
const fs = require('fs')

const h = (...components) => components.reduce((page, component) => `${page}-${component.replace(/[A-Z]/, c => c.toLowerCase())}`)

function run(raw) {
    const {page, business} = raw
    const relative = `${__dirname}/../../src/pages/${page}`
    mkdirp(`${relative}/business`, err => {
        fs.writeFile(`${relative}/index.vue`, pageTpl(page, business), console.log)
        fs.writeFile(`${relative}/adapter.js`, adapterTpl(business), console.log)

        business.map(component => {
            if (typeof component === 'string') {
                fs.writeFile(`${relative}/business/${component}.vue`, businessTpl(page, component), console.log)
            } else {
                mkdirp(`${relative}/business/${component.name}/partials`, (err) => {
                    fs.writeFile(`${relative}/business/${component.name}/index.vue`, businessTpl(page, component.name, component.partials), console.log)
                    fs.writeFile(`${relative}/business/${component.name}/adapter.js`, adapterTpl(component.partials), console.log)
                    
                    component.partials.map(partial => {
                        fs.writeFile(`${relative}/business/${component.name}/partials/${partial}.vue`, componentTpl(h(page, component.name, partial)), console.log)
                    })
                })
            }
        })
    })   
}

run(raw)
