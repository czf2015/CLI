// const http = require('http')
import { serve } from "https://deno.land/std@v0.36.0/http/server.ts";


function compose(middlewares) {
    return ctx => {
        const dispatch = (i) => {
            const middleware = middlewares[i]
            if (i === middlewares.length) {
                return
            }
            return middleware(ctx, () => dispatch(i + 1))
        }
        return dispatch(0)
    }
}

class Context {
    constructor(req, res) {
        this.req = req
        this.res = res
    }
}

export default class Application {
    constructor() {
        this.middlewares = []
    }

    /*  listen(...args) {
        const server = http.createServer(this.callback());
        server.listen(...args);
    }

    callback() {
        return async (req, res) => {
            const ctx = new Context(req, res);
            const fn = compose(this.middlewares);
            try {
                await fn(ctx);
            } catch (e) {
                console.error(e);
                ctx.res.statusCode = 500;
                ctx.res.end("Internel Server Error");
            }
            ctx.res.end(ctx.body);
        };
    } */

    async listen(port) {
        const server = serve({port})
        for await (const { req, res } of server) {
            await this.callback(req, res)
        }
    }

    async callback(req, res) {
        const ctx = new Context(req, res);
        const fn = compose(this.middlewares);
        try {
            await fn(ctx);
        } catch (e) {
            console.error(e);
            ctx.res.statusCode = 500;
            ctx.res.end("Internel Server Error");
        }
        // TODO:
        // ctx.res.end(ctx.body);
        console.log('ctx.res.end(ctx.body)')
    }

    use(middleware) {
        this.middlewares.push(middleware)
    }
}


// Example

const app = new Application()

app.use(async (ctx, next) => {
    console.log('Middleware 1 Start')
    await next()
    console.log('Middleware 1 End')
})

app.use(async (ctx, next) => {
    console.log('Middleware 2 Start')
    await next()
    console.log('Middleware 2 End')

    ctx.body = 'hello, world'
})

app.listen(7000)

console.log('server is listen on 7000')