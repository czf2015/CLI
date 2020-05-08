
import Component from '../components/Component.js'
import Header from './partials/header/Header.js'
import Footer from './partials/./Footer/Footer.js'
import Router from '../Router.js'
import HomePage from '../pages/homePage/HomePage.js'
import DemoPage from '../pages/demoPage/DemoPage.js'

window.customElements.define('app-header', Header);
window.customElements.define('app-footer', Footer);
window.customElements.define('app-router', Router);
window.customElements.define('home-page', HomePage);
window.customElements.define('demo-page', DemoPage);


export default class Layout extends Component {
    get template() {
        return (
        `<app-header props="add"></app-header>
        <main class="app-container">
            <h1>Click Me!</h1>
            <app-router></app-router>
        </main>
        <app-footer></app-footer>
        
        
        <style>
            .app-container > h1 {
                width:120px;
                border: solid;
                cursor: pointer;
            }
        </style>`
        )
    }

    // get data() {
    //     return {
    //         operation: 'add'
    //     }
    // }

    listen() {
        {
            this.shadow.querySelector('h1').addEventListener('click', () => {
                this.shadow.querySelector('app-header').state.props = 'sub'
                // const paths = ['/', '/home-page', '/demo-page'];
                // const pathIndex = paths.indexOf(window.location.pathname) + 1
                // window.location.pathname = pathIndex < paths.length ?  paths[pathIndex] : paths[0]
            })
        }
    }
}
