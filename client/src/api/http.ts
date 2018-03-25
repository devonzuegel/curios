import {get as _get} from 'lodash'

const csrfToken = _get(document.body, 'dataset.csrftoken')

const sharedOptions: RequestInit = {
  credentials: 'same-origin',
  headers: new Headers({
    // TODO: is this the right way to handle the possibly undefined CSRF token?
    'CSRF-TOKEN': csrfToken,
    'Content-Type': 'application/json',
  }),
}

const responseHandler = <T>(
  resolve: (value: PromiseLike<T>) => void,
  reject: (value: PromiseLike<T>) => void
) => async (res: Response) => {
  try {
    const json = await res.json()
    const success = res.status >= 200 && res.status < 300
    success ? resolve(json) : reject(json)
  } catch (error) {
    console.log(error)
    reject(error)
  }
}

export const post = <T>(endpoint: string, data: {[k: string]: any} = {}) =>
  new Promise<T>((resolve, reject) => {
    fetch(endpoint, {
      ...sharedOptions,
      method: 'post',
      body: JSON.stringify(data),
    })
      .then(r => responseHandler(resolve, reject)(r))
      .catch(e => {
        throw e
      })
  })

export const get = <T>(endpoint: string) =>
  new Promise<T>((resolve, reject) => {
    fetch(endpoint, {...sharedOptions, method: 'get'})
      .then(r => responseHandler(resolve, reject)(r))
      .catch(e => {
        throw e
      })
  })
