import respond from '@/utils/respond'


export default class {
    constructor(Model, list = []) {
        this.Model = Model
        this.list = list
    }

    GET(params) {
        return respond('GET', this.Model, this.list)(params)
    }

    POST(params) {
        return respond('POST', this.Model, this.list)(params)
    }

    DELETE(params) {
        return respond('DELETE', this.Model, this.list)(params)
    }

    PUT(params) {
        return respond('PUT', this.Model, this.list)(params)
    }

    PATCH(params) {
        return respond('PATCH', this.Model, this.list)(params)
    }
}