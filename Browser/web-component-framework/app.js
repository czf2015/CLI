// import Header from './layouts/header/Header.js'
// import Footer from './layouts/footer/Footer.js'
import Router from './Router.js'


class AppContainer extends Component {
    template() {
        return (
`<app-header operation="add">header</app-header>
<main class="app-container">
    <h1 @click={add}>Click Me!</h1>
    <app-router *for={routes} key={item.tag}></app-router>
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
                const el = this.$('[*for={routes}]')
                console.log(el)  
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
