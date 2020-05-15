// toFix
export default class Template {
    constructor(template, matches = {
        range: /\`([\s\S]*)\`/g,
        execute: /([\s\S]*)\$\{([\s\S]*)\}([^\}]*)/g, // ? 
        value: /([\{\(]*|\s+)\.{1}([a-zA-Z\_]+)/g
    }) {
        this.template = template
        this.matches = matches
    }

    render(data) {
        const { range, execute, value } = this.matches

        const _render = (template, flag = false/* 是否在模板内 */) => {
            let result = ''

            // 不在模板内
            if (!flag) {
                result = template.replace(range, ($, $1) =>
                    $1.match(range)
                        ? _render($1, true)
                        : $1
                )
            }

            // 在模板内
            result = template.replace(range, ($, $1) => {
                let result = $1
                // 先过滤范围
                if ($1.match(range)) {
                    result = _render($1, true)
                }
                // 查找可执行
                if ($1.match(execute)) {
                    result = $1.replace(execute, ($, $1, $2, $3) =>
                        $2.match(execute)
                            ? $1 + _render($2, true) + $3
                            : $2.replace(value, ($, $1, $2) =>
                                $1 + ($2 ? data[$2] : data)
                            )
                    )
                }
                return result
            })


            return result

        }
        return _render(this.template)
    }
}