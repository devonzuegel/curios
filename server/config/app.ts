import * as express from 'express'
import * as path from 'path'
import * as helmet from 'helmet'
import * as csrf from 'csurf'
import * as cookieParser from 'cookie-parser'
import * as bodyParser from 'body-parser'
import * as expressSession from 'express-session'
import * as fs from 'fs'
import * as morgan from 'morgan'

import {env, PipelineStages} from '@server/config/environment'
import * as middleware from '@server/config/middleware'

const app = express()

app.use(helmet())
app.use(morgan('tiny'))

// Required in order to parse JSON bodies for API endpoints
app.use(bodyParser.json())
app.use(cookieParser(env.sessionSecret))

const sessionOpts: expressSession.SessionOptions = {
  secret: env.sessionSecret,
  resave: true,
  saveUninitialized: true,
}

if (env.pipelineStage === PipelineStages.development) {
  app.use(expressSession(sessionOpts))
} else {
  app.set('trust proxy', 1) // Trust first proxy
  app.use(middleware.enforceHTTPS)
  app.use(expressSession({...sessionOpts, cookie: {secure: true}}))
  app.use(csrf({cookie: true}))
}

const projectDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relativePath: string) =>
  path.resolve(projectDirectory, relativePath)

export const clientDir = resolveApp('build/client')

// Serve static files from the React app
app.use(express.static(clientDir))

export default app
