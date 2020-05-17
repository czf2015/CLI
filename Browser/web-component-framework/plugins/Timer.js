export default class Timer {
    constructor({ time = 0, status = 'stoped' } = {}) {
        this.time = time;
        this.status = status;
        this.tid = -1;
    }

    start() {
        if (this.status === "stoped") {
            this.status = "continue";
            this.time = 0;
            this.tid = setInterval(() => {
                this.time += 1;
            }, 10);
        }
        return this
    }

    pause() {
        if (this.status == "continue") {
            this.status = "paused";
            clearInterval(this.tid);
        }
        return this
    }

    continue() {
        if (this.status == "paused") {
            this.status = "continue";
            this.tid = setInterval(() => {
                this.time += 1;
            }, 10);
        }
        return this
    }

    stop() {
        if (this.status != "stoped") {
            this.status = "stoped";
            if (this.status == "continue") {
                clearInterval(this.tid);
            }
        }
        return this
    }
}