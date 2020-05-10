import AddList from '../../components/AddList.js'


export default class Header extends AddList {
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
}
