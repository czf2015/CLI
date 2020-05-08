import { AbstractComponent } from '../helpers.js'


export default class AddList extends AbstractComponent {
    render() {
        // computed
        return (
            `<div>
                <input type="text" placeholder="hello" value="${this.state.inputVal}" />
                <button type="button">add</button>
                <ul>
                    ${this.state.list.map(item => `<li>${item}</li>`).join("")}
                </ul>
            </div>`
        );
    }

    data() {
        return {
            inputVal: '',
            list: [],
        }
    }

    listen() {
        {   // comments
            this.inputRef = this.shadow.querySelector("input");
            this.shadow.querySelector("button").addEventListener("click", () => {
                const inputVal = this.inputRef.value || this.inputRef.placeholder
                if (inputVal) {
                    Object.assign(this.state, {
                        inputVal,
                        list: [...this.state.list, inputVal]
                    })
                }
            });
        }
    }
}
