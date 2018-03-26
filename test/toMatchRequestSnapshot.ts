import * as supertest from 'supertest'
import {omit as withoutKeys} from 'lodash'
const {toMatchSnapshot} = require('jest-snapshot')

/**
 * This is a list of response headers that will removed from the response
 * snapshot before being written. For example, the date header will make all
 * tests fail since the date will always be different when the tests are run
 * again. This list isn't supposed to be exhaustive, so if you are writing a
 * new test and having issues then you should add other headers to this array.
 */
const ignoredHeaders = [
  'connection',
  'content-length',
  'date',
  'etag',
  'x-powered-by',
]

/**
 * Narrow down the response data we are snapshotting then
 * call the main snapshot function.
 */
function toMatchRequestSnapshot(
  this: any,
  {header, status, body}: supertest.Response,
  ...args: any[]
) {
  return toMatchSnapshot.apply(this, [
    {
      headers: withoutKeys(header, ignoredHeaders),
      status,
      body,
    },
    ...args,
  ])
}

// Mix our custom matcher into the jest matcher family
expect.extend({toMatchRequestSnapshot})

// Make TypeScript aware of the new matcher
declare global {
  namespace jest {
    interface IMatchers<R> {
      toMatchRequestSnapshot(snapshotName?: string): R
    }
  }
}
