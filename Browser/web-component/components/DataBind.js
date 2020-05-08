import { AbstractComponent } from '../helpers.js'


export default class DataBind extends AbstractComponent {
    render() {
        return (
            `<div>
                <input type="text" value="${this.state.inputVal}"/>
                <h4>${this.state.inputVal}</h4>
            </div>`
        );
    }

    data() {
        return {
            inputVal: 'hello'
        }
    }

    listen() {
        {
            this.inputRef = this.shadow.querySelector('input');
            this.inputRef.addEventListener('keyup', (e) => {
                this.state.inputVal = e.target.value;
                this.inputRef.selectionStart = e.target.selectionStart;
                this.inputRef.selectionEnd = e.target.selectionEnd;
                this.inputRef.focus();
            })
        }
    }
}