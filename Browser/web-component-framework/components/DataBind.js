import { Component } from '../lib/framework/index.mjs'


export default class DataBind extends Component {
    render({ inputVal }) {
        return (
            `<div>
                <input type="text" value="${inputVal}"/>
                <h4>${inputVal}</h4>
            </div>`
        )
    }

    data() {
        return {
            inputVal: 'hello'
        }
    }

    listen() {
        {
            this.inputRef = this.$('input')
            this.inputRef.addEventListener('keyup', (e) => {
                this.setState({ inputVal: e.target.value })
                this.inputRef.selectionStart = e.target.selectionStart
                this.inputRef.selectionEnd = e.target.selectionEnd
                this.inputRef.focus()
            })
        }
    }
}