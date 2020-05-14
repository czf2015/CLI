import Application from '../lib/koa-mini.js'

const app = new Application()

function customMiddleware(params) {
    return async (ctx, next) => {
        console.log(`Middleware ${params} Start`)
        if (ctx.params) {
            ctx.params.push(params)
        } else {
            ctx.params = [params]
        }
        await next()
        console.log(ctx.params)
        console.log(`Middleware ${params} End`)
    }
}

app.use(customMiddleware(1))
app.use(customMiddleware(2))

app.listen({ port: 8000 })
console.log('server is listen on 8000')

