import { Component } from '../framework/index.js'


export default class AddList extends Component {
    render({ inputVal, list }) {
        // computed
        return (
            `<div>
                <input type="text" placeholder="hello" value="${inputVal}" />
                <button type="button">add</button>
                <ul>
                    ${list.map(item => `<li>${item}</li>`).join("")}
                </ul>
            </div>`
        );
    }

    data() {
        return {
            inputVal: '', // div>input::first-child attribute: value
            list: [],
        }
    }

    listen() {
        {   // comments
            this.inputRef = this.$("input");
            this.$("button").addEventListener("click", () => {
                const inputVal = this.inputRef.value || this.inputRef.placeholder
                if (inputVal) {
                    this.setState({
                        inputVal,
                        list: [...this.state.list, inputVal]
                    })
                }
            })
        }
    }
}
