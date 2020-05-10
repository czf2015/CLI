import { serve } from "https://deno.land/std@v0.36.0/http/server.ts";


function compose(middlewares) {
    return ctx => {
        const dispatch = (i) => {
            const middleware = middlewares[i]
            if (i < middlewares.length) {
                return middleware(ctx, () => dispatch(i + 1))
            }
        }
        return dispatch(0)
    }
}

export default class Application {
    constructor() {
        this.middlewares = []
    }

    async listen(opts) {
        const s = serve(opts)
        for await (const ctx of s) {
            await this.callback(ctx)
        }
    }

    async callback(ctx) {
        const fn = compose(this.middlewares);
        try {
            await fn(ctx);
            ctx.respond({ body: '<h1>ctx.body</h1>' })
        } catch (e) {
            console.error(e);
            ctx.respond({ body: e })
        }
    }

    use(middleware) {
        this.middlewares.push(middleware)
    }
}