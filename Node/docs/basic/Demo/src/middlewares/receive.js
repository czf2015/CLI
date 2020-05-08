function query(model, all = false, prerequisite = {}, skip = 0, limit = 10, sort = {}) {
    if (all) {
        return async ctx => {
            try {
                const results = await model.find(prerequisite).skip(skip).limit(limit).sort(sort)
                ctx.body = { status: 'success', results }
            } catch (err) {
                ctx.body = { status: 'fail', err }
            }
        }
    } else {
        return async ctx => {
            try {
                const result = await model.findOne(ctx.params)
                ctx.body = { status: 'success', result }
            } catch (err) {
                ctx.body = { status: 'fail', err }
            }
        }
    }
}

function create(model) {
    return async ctx => {
        try {
            const result = await model.insert(ctx.request.body)
            ctx.body = { status: 'success', result }
        } catch (err) {
            ctx.body = { status: 'fail', err }
        }
    }
}

function remove(model, all = false) {
    if (all) {
        return async ctx => {
            try {
                const result = await model.remove(ctx.request.body)
                ctx.body = { status: 'success', result }
            } catch (err) {
                ctx.body = { status: 'fail', err }
            }
        }
    } else {
        return async ctx => {
            try {
                const result = await model.remove(ctx.params)
                ctx.body = { status: 'success', result }
            } catch (err) {
                ctx.body = { status: 'fail', err }
            }
        }
    }
}


function update(model) {
    return async ctx => {
        try {
            const result = await model.update(ctx.params, ctx.request.body)
            ctx.body = { status: 'success', result }
        } catch (err) {
            ctx.body = { status: 'fail', err }
        }
    }
}

module.exports = {
    query,
    create,
    remove,
    update,
}