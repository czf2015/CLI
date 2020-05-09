import { Component } from '../lib/framework/index.js'
import './register-element.js'


class AppContainer extends Component {
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
        {   // 点击click，页面跳转
            const paths = ['/', '/demoPage/test']
            this.shadow.querySelector('h1').addEventListener('click', () => {             
                const pathIndex = paths.indexOf(window.location.pathname) + 1
                window.location.pathname = pathIndex < paths.length ?  paths[pathIndex] : paths[0]
            })
        }
        {   // 点击click，验证单向传递   
            this.header = this.shadow.querySelector('app-header')        
            this.shadow.querySelector('.app-container > h1').addEventListener('click', () => {   
                if (this.header.state.list.length > 3) {
                    this.header.props.operation = 'sub'
                }    
            })
        }
    }
}


window.customElements.define('app-container', AppContainer)
