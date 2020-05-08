export function run(task, time) {
    task()
    if (typeof time === 'number') {
        setInterval(task, time)
    }
}
