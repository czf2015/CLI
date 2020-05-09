import { AbstractShadow } from '../helpers.js'
import './register-element.js'


class AppContainer extends AbstractShadow {
    render() {
        return (
        `<app-header operation="add"></app-header>
        <main class="app-container">
            <h1>Click Me!</h1>
            <app-router></app-router>
        </main>
        <app-footer></app-footer>
        
        
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
        {
            const paths = ['/', '/demoPage/test'];
            this.shadow.querySelector('h1').addEventListener('click', () => {             
                const pathIndex = paths.indexOf(window.location.pathname) + 1
                window.location.pathname = pathIndex < paths.length ?  paths[pathIndex] : paths[0]

                // 验证单向传递
                this.shadow.querySelector('app-header').props.operation = window.location.pathname

            })
        }
    }
}


window.customElements.define('app-container', AppContainer);
