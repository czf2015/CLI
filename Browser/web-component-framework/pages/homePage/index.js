import TodoList from './business/TodoList.js'
import FeedBack from './business/FeedBack.js'

class HomePage extends Component {
    template() {
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