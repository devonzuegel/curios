import * as fs from 'fs'
import * as R from 'ramda'
import * as path from 'path'
import chalk from 'chalk'
import {get} from 'lodash'

import {env, PipelineStages} from './config/environment'
import app, {clientDir} from './config/app'

/**
 * This ensures that routes on the frontend won't clash with API endpoints.
 */
app._router.stack.map((s: {route?: {path?: string; stack?: any[]}}) => {
  const isNotRoute = !s.route
  if (isNotRoute) {
    return // If the path is undefined, it's middleware, so just skip it
  }
  const pathname = get(s, 'route.path')
  if (!R.startsWith('/api', pathname)) {
    throw Error(
      `API endpoints must begin with /api. Please add that prefix to "${pathname}".`
    )
  }
  if (get(s, 'route.stack.length') < 2) {
    throw Error(
      `API endpoints must enforce the "apiOnly" handler. Please add it to "${pathname}"`
    )
  }
})

/**
 * The "catchall" handler: for any request that doesn't match one above,
 * send back React's main.html file.
 */
app.get('*', (req, res) => {
  const staticIndex = fs
    .readFileSync(path.resolve(clientDir, 'main.html'))
    .toString()

  if (env.pipelineStage === PipelineStages.development) {
    res.send(staticIndex)
  } else {
    const index = staticIndex.replace('{{csrfToken}}', req.csrfToken())
    res.send(index)
  }
})

app.listen(env.appPort)

const printInstructions = () => {
  console.log(
    `Starting server in ${chalk.bgCyanBright.black(env.pipelineStage)} mode `
  )

  const urls = {
    localUrlForTerminal: `http://localhost:${env.appPort}/`,
    lanUrlForTerminal: `http://10.19.0.43:${env.appPort}/`,
  }
  console.log()
  console.log(
    `You can now view ${chalk.bold.bgBlue('curios-web-server')} in the browser.`
  )
  console.log()

  if (urls.lanUrlForTerminal) {
    console.log(`  ${chalk.bold('Local:')}            ${urls.localUrlForTerminal}`)
    console.log(`  ${chalk.bold('On Your Network:')}  ${urls.lanUrlForTerminal}`)
  } else {
    console.log(`  ${urls.localUrlForTerminal}`)
  }

  console.log()
}

printInstructions()
