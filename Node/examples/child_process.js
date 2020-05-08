const cp = require('child_process')

// cp.execFile('./cmd.sh', (err, stdout, stderr) => {
//     if (err) {
//         console.error(err)
//     } else {
//         console.info(stdout)
//     }
// })

cp.exec('./cmd.sh', (err, stdout, stderr) => {
    console.log(stderr)
})