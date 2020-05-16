export default class Meta {
    constructor(meta) {
        this.meta = meta
    }

    define() {
        const { meta } = this
        switch (typeof meta) {
            case 'boolean':
                return {
                    type: 'boolean',
                    required: false,
                    default: meta,
                    value: meta,
                }

            case 'number':
                return {
                    type: 'number',
                    required: false,
                    default: meta,
                    value: meta,
                }

            case 'string':
                return {
                    type: 'string',
                    required: false,
                    default: meta,
                    value: meta,
                }

            case 'function':
                return {
                    type: meta,
                    required: false,
                    default: new meta(),
                    value: new meta(),
                }

            case 'object':
                if (Array.isArray(meta)) {
                    return {
                        type: Array,
                        required: false,
                        default: meta,
                        value: meta
                    }
                } else {
                    return {
                        type: meta.type || 'any',
                        required: meta.required || false,
                        default: meta.default,
                        value: meta.value
                    }
                }
            default:
                break
        }
    }
}