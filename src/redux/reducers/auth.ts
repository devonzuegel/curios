import * as Redux from 'redux'
import * as organization from './organization'

export enum ActionTypeKeys {
  SIGNUP = 'auth/SIGNUP',
  SIGNIN = 'auth/SIGNIN',
  SIGNOUT = 'auth/SIGNOUT',
  SET_REDIRECT = 'auth/SET_REDIRECT',
  OTHER = '__other__',
}

export type TSignin = {type: ActionTypeKeys.SIGNIN}
export type TSignup = {type: ActionTypeKeys.SIGNUP}
export type TSignout = {type: ActionTypeKeys.SIGNOUT}
export type TSetRedirect = {
  type: ActionTypeKeys.SET_REDIRECT
  redirectTo: string
}
export type TActionTypes =
  | TSignin
  | TSignup
  | TSignout
  | TSetRedirect
  | {type: ActionTypeKeys.OTHER}

export type TState = {
  /**
   * When set, the app will redirect to this route upon successful signin.
   * For example, if I try to access a protected dashboard route before
   * logging in, I'll first be directed to the /signin page, then once
   * I sign in successfully, it'll redirect me to the dashboard route I
   * originally requested.
   */
  redirectTo: null | string
  signedIn: boolean
}

const initialState: TState = {
  signedIn: false,
  redirectTo: null,
}

export default (state = initialState, action: TActionTypes) => {
  switch (action.type) {
    case ActionTypeKeys.SIGNIN:
      return {...state, signedIn: true}

    case ActionTypeKeys.SIGNUP:
      console.log('TODO: dispatch request to create new account')
      return {...state, signedIn: true}

    case ActionTypeKeys.SIGNOUT:
      return {...state, signedIn: false}

    case ActionTypeKeys.SET_REDIRECT:
      return {...state, redirectTo: action.redirectTo}

    default:
      return state
  }
}

export const actions = {
  signin: () => (dispatch: Redux.Dispatch<TSignin>) => {
    return dispatch({type: ActionTypeKeys.SIGNIN}) as TSignin
  },

  signup: () => (dispatch: Redux.Dispatch<TSignup>) => {
    return dispatch({type: ActionTypeKeys.SIGNUP}) as TSignup
  },

  signout: () => (dispatch: Redux.Dispatch<TSignout>) => {
    dispatch({type: organization.ActionTypeKeys.CLEAR})
    return dispatch({type: ActionTypeKeys.SIGNOUT})
  },

  setRedirect: (redirectTo: string) => {
    return (dispatch: Redux.Dispatch<TSetRedirect>) =>
      dispatch({
        type: ActionTypeKeys.SET_REDIRECT,
        redirectTo,
      }) as TSetRedirect
  },
}
