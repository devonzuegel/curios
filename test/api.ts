import * as supertest from 'supertest'
import * as express from 'express'
import * as bodyParser from 'body-parser'

import './toMatchRequestSnapshot'

const app = express()
app.use(bodyParser.json())

// Helper function for DRYing up GET requests
const get = (path: string) =>
  supertest(app)
    .get(path)
    .set({'Content-Type': 'application/json'})

// Helper function for DRYing up POST requests
const post = (path: string) =>
  supertest(app)
    .post(path)
    .set({'Content-Type': 'application/json'})

export {app, get, post}
