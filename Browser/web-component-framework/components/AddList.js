import { AbstractShadow } from '../core.js'


export default class AddList extends AbstractShadow {
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
            })
        }
    }
}
