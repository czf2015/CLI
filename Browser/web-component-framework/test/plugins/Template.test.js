import Template from '../../plugins/Template.js'

// dxdfd s  czf "." name ${ 34 czf name  34 czf "d" "d"} "age" czf 34  fsfs

const template = 'dx\`dfd s ${ .name "." \`name ${ .age .name \`name ${ .age .name "d"}\` "d"}\` "age" .name .age } \`fsfs'

const data = { name: 'czf', age: 34 }

const renderTmpl = (template, data) => new Template(template).render(data)

const result = renderTmpl(template, data)

console.log('------Test---------')
console.log(result)
