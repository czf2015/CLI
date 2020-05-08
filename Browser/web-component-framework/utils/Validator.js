class Validator {
    constructor() {
        this.cache = []
    }

    // dom: {value}
    // rules: [{strategy, errorMsg}]
    add(dom, rules) {
        rules.forEach(rule => {
            const strategies = rule.strategy.split(':');
            const errorMsg = rule.errorMsg;
            this.cache.push(() => {
                const strategy = strategies.shift();
                strategies.unshift(dom.value);
                strategies.push(errorMsg);
                return strategies[strategy].apply(dom, strategies);
            });
        })
    }

    start() {
        for (var i = 0, validatorFunc; validatorFunc = this.cache[i];) {
            // var
        }
    }
}


