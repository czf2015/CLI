// TODO
export default class Validator {
    constructor(checkList/* [[item, isValid, errMsg]] */) {
        this.checkList = checkList
        this.tips = []
    }
    // 
    validate(value)/* : boolean */ {
        for (let i = 0; i < this.checkList.length; i++) {
            const [item, isValid, errMsg] = this.checkList[i]
            if (!isValid(value)) {
                this.tips.push(`${item} ${errMsg}`)
            }
        }

        return this.tips.length > 0
    }
}