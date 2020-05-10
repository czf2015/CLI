import { Component, customElementRegister } from '../../lib/framework/index.js'
import TodoList from './business/TodoList.js'
import FeedBack from './business/FeedBack.js'

class HomePage extends Component {
    render() {
        return (
            `<feed-back></feed-back>
            <todo-list></todo-list>`
        )
    }
}

customElementRegister({
    'home-page': HomePage,
    'todo-list': TodoList,
    'feed-back': FeedBack,
})