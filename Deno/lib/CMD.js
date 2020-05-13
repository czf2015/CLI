// export class CMD {
//     constructor(args) {
//         this.args = args
//     }
//     static parse(args) {
//         // 
//         const data = {}
//         args.forEach(arg => {
//             switch (arg) {
//                 case 
//             }
//         })
//     }
// }

const patterns = {
    'value': /^()([a-zA-Z_]+\w*)$/, // 值
    '--key': /^[-]{2}()([a-zA-Z_]+\w*)$/, // 键 --
    '-nkey': /^[-]([1-9][0-9]*)([a-zA-Z_]+\w*)$/, // 键
    '-keys': /^[-]()([a-zA-Z_]+\w*)$/, // 短参
    
    // 'startKey': /^[\^]([a-zA-Z_]+\w*$)/,
    // 'endKey': /^[\$]([a-zA-Z_]+\w*$)/,
    // 'value': /(^[a-zA-Z_]+\w*$)/,
    // 'values': /^[\-]([a-zA-Z_]+\w*$)/,
    // 'key': /^[:]([a-zA-Z_]+\w*$)/,
    // 'value': /(^[a-zA-Z_]+\w*$)/,
    // 'array': /^[\-]([a-zA-Z_]+\w*$)/,
}




const parse = (inputs, target, isArray) => {
    inputs.forEach(input => {
        Object.entries(patterns).forEach(([type, pattern]) => {
            const matches = input.match(pattern)

            if (matches) {
                console.log(matches)

                const [_, $1, $2] = matches

                // switch (type) {
                //     case 'value':
                //         if (isArray) {
                //             target.push($1)
                //         } else {
                //             target = $1
                //         }
                //         break

                //     case 'key':
                //         if (isArray) {

                //             target[$1] = {}
                //         } else {
                //             target = $1
                //         }
                //         break

                //     case 'array':
                //         if (isArray) {
                //             target[$1] = []
                //         } else {
                //             target = $1
                //         }
                //         break
                // }
            }
        })
    })
}

// -

// [[[a]]]
// -
//     -
//         -a

const inputs = ['field', ':field', '-field', '--field', '-4filed', '-10field']

parse(inputs)