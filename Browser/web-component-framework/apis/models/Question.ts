const Similar = {
}

// 选择
const Choice = {
    ...Similar,
    stem: '',
    type: 'single', // | 'multiple',
    options: [],
    answer: '',
    analyze: ''
}

// 填空
const Completion = {
    ...Similar,
    stem: '',
    answer: [],
    analyze: ''
}

// 解答
const Explain = {
    ...Similar,
    context: '',
    stems: [],
    answer: [],
    analyze: []
}

// 混合
const Hybrid = {
    ...Similar,
    context: '',
    items: [] // 
}