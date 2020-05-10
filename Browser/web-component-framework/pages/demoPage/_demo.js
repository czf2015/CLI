import { customElementRegister, Request } from '../../lib/framework/index.js'
import DataBind from '../../components/DataBind.js'
import { ACCOUNT } from '../../apis/index.js'

class DemoPage extends DataBind {
    listen() {
        {
            Request.get(ACCOUNT).then(res => {
                console.log(res)
                ACCOUNT.post({id: 0, username: 'c0', password: '00'})
                    .then(console.log)
            })
        }
    }
}

customElementRegister({
    'demo-page': DemoPage,
})

