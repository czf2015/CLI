import DataBind from '../../components/DataBind.js'
import { USER } from '../../config/apis.js'
import store from '../../store/index.js'


class DemoPage extends DataBind {
    async once() {
        {
            // USER.get().then(res => {
            //     console.log(res)
            setTimeout(() => {
                USER.post({ id: 0, username: 'c0', password: '00' })
                    .then(({ data } = {}) => {
                        console.log(data)
                        store.dispatch('push', { history: { title: 'demo', tag: 'demo_page', data } })
                        console.log(store.state)
                    })
            }, 200)
            // })
        }
    }
}

customElementRegister({
    'demo-page': DemoPage,
})

