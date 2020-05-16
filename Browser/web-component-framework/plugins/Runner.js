// TODO
export class Runner {
    constructor(tasks, rule) {
        this.tasks = tasks
        this.rule = rule
    }

    execute(handle, task) {
        return Array.isArray(task) ? task.map(handle) : handle(task)
    }

    async integrate(rule, cause) {
        const h = cause => rule.handle ? rule.handle(cause) : cause

        if (rule.prerequisites && rule.prerequisites.length > 0) {
            switch (rule.mode) {
                case 'serial':
                    for (let i = 0; i < rule.prerequisites.length; i++) {
                        cause = await integrate(rule.prerequisites[i], cause)
                    }
                    return h(cause)
                case 'parallel':
                case 'select':
                    const promises = rule.prerequisites.map(async (prerequisite) => await integrate(prerequisite, cause))
                    const method = rule.mode === 'parallel' ? 'all' : 'race'
                    return Promise[method](promises).then(h)
                default:
                    throw `${rule.mode} is not one type of modes: serial, parallel, select`
            }
        } else {
            return h(cause)
        }
    }
}