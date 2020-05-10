import { customElementRegister, Request } from '../../lib/framework/index.js'
import DataBind from '../../components/DataBind.js'
import { ACCOUNT } from '../../apis/index.js'
import store from '../../store/index.js'


class DemoPage extends DataBind {
    init() {
        {
            Request.get(ACCOUNT).then(res => {
                console.log(res)
                ACCOUNT.post({ id: 0, username: 'c0', password: '00' })
                    .then(({ data }) => {
                        console.log(data)
                        store.dispatch('push', { history: { title: 'demo', tag: 'demo_page', data }})
                        console.log(store.state)
                    })
            })
        }
    }
}

customElementRegister({
    'demo-page': DemoPage,
})

