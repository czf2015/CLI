// TODO
export default class Server {
    constructor({ ip = 'localhost', port = 80, handler } = {}) {
        this.ip = ip
        this.port = port
        this.handler = handler
    }

    listen(port) {
        this.port = port
        this.handler()
    }
}