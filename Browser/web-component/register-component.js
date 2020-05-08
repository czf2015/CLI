
import Header from './layouts/header/Header.js'
import Footer from './layouts/./Footer/Footer.js'
import Router from './Router.js'
import HomePage from './pages/homePage/HomePage.js'
import DemoPage from './pages/demoPage/DemoPage.js'

window.customElements.define('app-header', Header);
window.customElements.define('app-footer', Footer);
window.customElements.define('app-router', Router);
window.customElements.define('home-page', HomePage);
window.customElements.define('demo-page', DemoPage);