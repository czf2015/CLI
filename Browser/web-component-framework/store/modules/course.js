export default {
    time: {
        type: Date,
        default: Date.now(),
        required: true
    },
    number: {
        type: 'number',
        default: 0,
        required: true
    },
    cost: {
        type: 'number',
        default: 0,
        required: true
    },
}