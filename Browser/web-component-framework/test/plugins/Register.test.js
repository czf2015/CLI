import Register from '../../plugins/Register.js'

const register = new Register('test')

register.set('name', 'czf')

register.set('age', 32)

console.log(register.get('name'))

console.log(register.get())

console.log(register.get('height'))