import { Store } from '../lib/framework/index.js'
import purchase from './modules/purchase.js'
import course from './modules/course.js'
import entertainment from './modules/entertainment.js'


export default new Store({
  purchase,
  course,
  entertainment,
})