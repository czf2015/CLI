import { customElementRegister } from '../../lib/framework/index.js'
import DataBind from '../../components/DataBind.js'


class DemoPage extends DataBind {

}

customElementRegister({
    'demo-page': DemoPage,
})

