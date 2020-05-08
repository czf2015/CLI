import * as express from 'express'
import * as bodyParse from 'body-parser'
import * as cookieParser from 'cookie-parser'
import * as path from 'path'
import config from 'config'
import {logger, E} from 'global'
import {systemAPI} from './middlewares'
import {serveFavicon, serveStatic, userPassport, integration, logs, developer, yehe} from 'middlewares'

const app = express()
Object.assign(app.locals, config.appLocals)

app.set('env', config.env)
app.set('query parser', 'simple')
app.set('case sensitive routing', true)
app.set('strict routing', true)
app.set('trust proxy', true)
app.set('jsonp callback name', 'callback')
app.disable('x-powered-by', true)

app.use(logs.request)

app.use(bodyParse.json({limit: '20mb'}))
app.use(bodyParse.raw({limit: '1gb'}))

app.use(cookieParser())

app.use(logs.body)
app.use(logs.response)

app.use(userPassport())
app.use(serveFavicon())

app.use('/static', serveStatic())

app.use('/api/v1/yehe/:apiName', developer())
app.use('/api/v1/:systeKey/:apiName', integration())

app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

export default app