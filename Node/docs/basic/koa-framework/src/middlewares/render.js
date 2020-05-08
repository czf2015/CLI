module.exports = (tpl, raw) => {
    return async (ctx) => {
        await ctx.render(tpl, raw)
    }
}