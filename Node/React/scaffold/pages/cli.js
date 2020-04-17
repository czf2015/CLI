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
        fs.writeFile(`${relative}/index.js`, pageTpl(page, business), console.log)
        fs.writeFile(`${relative}/adapter.js`, adapterTpl(business, 'business'), console.log)

        business.map(component => {
            if (typeof component === 'string') {
                mkdirp(`${relative}/business/${component}`, (err) => {
                    fs.writeFile(`${relative}/business/${component}/index.js`, businessTpl(page, component), console.log)
                })
            } else {
                mkdirp(`${relative}/business/${component.name}/partials`, (err) => {
                    fs.writeFile(`${relative}/business/${component.name}/index.js`, businessTpl(page, component.name, component.partials), console.log)
                    fs.writeFile(`${relative}/business/${component.name}/adapter.js`, adapterTpl(component.partials), console.log)
                    
                    component.partials.map(partial => {
                        mkdirp(`${relative}/business/${component.name}/partials/${partial}`, (err) => {
                            fs.writeFile(`${relative}/business/${component.name}/partials/${partial}/index.js`, componentTpl(h(page, component.name, partial)), console.log)
                        })
                    })
                })
            }
        })
    })   
}

run(raw)
