import Store from '../plugins/Store.js'
import purchase from './modules/purchase.js'
import course from './modules/course.js'
import entertainment from './modules/entertainment.js'
import history from './modules/history.js'


export default new Store({
  purchase,
  course,
  entertainment,
  history,
})

