import { AbstractShadow } from '../../lib/framework/index.js'


export default class Footer extends AbstractShadow {
    render({ inputVal, list, operation }) {
        return (
            `<div>
                <input type="text" value="${inputVal}" />
                <button type="button">${operation}</button>
                <ul>
                    ${list.map(item => `<li>${item}</li>`).join("")}
                </ul>
            </div>`
        )
    }

    data() {
        return {
            inputVal: '',
            list: [],
        }
    }

    listen() {
        {   // comments
            this.inputRef = this.shadow.querySelector("input")
            this.shadow.querySelector("button").addEventListener("click", () => {
                if (this.inputRef.value) {
                    Object.assign(this.state, {
                        inputVal: this.inputRef.value, 
                        list: [...this.state.list, this.inputRef.value]
                    })
                }
            })
        }
    }
}
