// import Header from './layouts/header/Header.js'
// import Footer from './layouts/footer/Footer.js'
import Router from './Router.js'


class AppContainer extends Component {
    template(/* { routes } */) {
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

    listen() {
        {   // 点击click，验证单向传递
            this.header = this.$('app-header')
            this.$('.app-container > h1').addEventListener('click', (e) => {
                console.log('click')
            })
        }
    }
}

customElementRegister({
    'app-container': AppContainer,
    // 'app-header': Header,
    // 'app-footer': Footer,
    'app-router': Router,
})
