// TODO
export default class Task {
    constructor(name) {
        this.name = name
        this.status = 'undo' // 'pendding' | 'suspend' | 'done'
    }

    run() {
        this.status = 'done'
    }
}