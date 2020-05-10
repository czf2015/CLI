import { customElementRegister, DB, Request } from '../../lib/framework/index.js'
import DataBind from '../../components/DataBind.js'
import { ACCOUNT } from '../../apis/index.js'
import store from '../../store/index.js'
// import IndexedDB from '../../test/indexedDB_2.js'


class DemoPage extends DataBind {
    once() {
        {
            ACCOUNT.get().then(res => {
                console.log(res)
                ACCOUNT.post({ id: 0, username: 'c0', password: '00' })
                    .then(({ data }) => {
                        console.log(data)
                        store.dispatch('push', { history: { title: 'demo', tag: 'demo_page', data }})
                        console.log(store.state)
                    })
            })
        }
        // {
        //     const db = new IndexedDB('test',"test", 1)
        //     db.set('test', { test: 0 })
        // }
        {
            Request.get('wwww.baidu.com').then(console.log)
        }
    }
}

customElementRegister({
    'demo-page': DemoPage,
})

