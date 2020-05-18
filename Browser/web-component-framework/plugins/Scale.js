export default class Scale {
    constructor(datum, domain, range = [0, 1]) {
        this.datum = datum
        this.domain = domain
        this.range = range
    }

    get data() {
        const scale = (range[1] - range[0]) / (domain[1] - domain[0])
        return this.datum.map(d => (d - domain[0]) * scale + domain[0])
    }
}