// TODO
export default class Master {
    constructor(name) {
        this.name = name
    }

    dispatch(task) {
        task.run()
    }
    // 
}