import Meta from '../../plugins/Meta.js'

const meta = new Meta({ type: 't', default: 't' })

const result = meta.define()

console.log(result)