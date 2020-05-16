export default class AddList extends Component {
    template({ inputVal, theme, list }) {
        return (
            `<div>
                <input type="text" placeholder="hello" :value="inputVal" :class="theme" @focus="pop" />
                <button type="button">add</button>
                <ul>
                    <li *for="item in list" :key="item">{item}</li>
                </ul>
            </div>`
        )
    }

    // data() {
    //     return {
    //         inputVal: '', // this.$('div > input:nth-child(1)').value = {inputVal} 
    //         list: [], // this.$('div > ul:nth-child(3) > list:nth-child(n)', true).map(el => el.innerHTML = {item})
    //     }
    // }

    listen() {
        {   // comments
            this.inputRef = this.$("input");
            this.$("button").addEventListener("click", (e) => {
                console.log(this.inputRef.value)
                console.log(e.target.type)
                // const inputVal = this.inputRef.value || this.inputRef.placeholder
                // if (inputVal) {
                //     this.setState({
                //         inputVal,
                //         list: [...this.state.list, inputVal]
                //     })
                // }
            })
        }
    }
}
