import { customElementRegister, DB, Request } from '../../lib/framework/index.js'
import DataBind from '../../components/DataBind.js'
import { ACCOUNT } from '../../apis/index.js'
import store from '../../store/index.js'
// import IndexedDB from '../../test/indexedDB_2.js'


class DemoPage extends DataBind {
    async once() {
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
        {
            const db = new DB('test1', 2)
            await db.create("test1", { key: "id", index: [{ key: 'czf', unique: false }] })
            await db.insert("test1", { czf: 'czf1'})
            setTimeout(async () => {
            }, 200)
        }
        {
            Request.get('wwww.baidu.com').then(console.log)
        }
    }
}

customElementRegister({
    'demo-page': DemoPage,
})

