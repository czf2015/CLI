export default class extends HTMLElement {
    constructor({ tween, delay = 0, duration = 200, ease = 'easeLinear' }) {
        this.delay = delay
        this.duration = duration
        this.ease = ease
        this.tween = tween
    }
}
