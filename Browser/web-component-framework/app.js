// import Header from './layouts/header/Header.js'
// import Footer from './layouts/footer/Footer.js'
import Router from './Router.js'
import Request from './plugins/Request.js'


class AppContainer extends Component {
    template() {
        return (
`<app-header operation="add">header</app-header>
<main class="app-container">
    <h1 :message="message" @click="add">Click Me!</h1>
    <app-router *if="routes" :routes="routes"></app-router>
    <ul>
        <li *for="list" :key=".">{.}</li>
    </ul>
</main>
<app-footer>footer</app-footer>
<style>
.app-container > h1 {
    width: 120px;
    border: solid;
    cursor: pointer;
}
</style>`
        )
    }

    async init() {
        return await Request.get('/data/population.csv', undefined, { dataType: 'text' })
            .then(res => {
                console.log('----------Request------------')
                console.log(res.text())
                return {
                    props: {
                        routes: []
                    },

                    data: {
                        a: 1,
                        b: 2,
                        list: [1, 2, 3]
                    },

                    computed: {
                        c({ a, b }) {
                            return a + b
                        }
                    },

                    methods: {
                        add(a, b) {
                            return a + b
                        }
                    },

                    mode: 'open'

                }
            })
    }
}

customElementRegister({
    'app-container': AppContainer,
    // 'app-header': Header,
    // 'app-footer': Footer,
    // 'app-router': Router,
})
