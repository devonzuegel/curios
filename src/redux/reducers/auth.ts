import * as Redux from 'redux'

export enum ActionTypeKeys {
  SIGNUP = 'auth/SIGNUP',
  SIGNIN = 'auth/SIGNIN',
  SIGNOUT = 'auth/SIGNOUT',
  SET_REDIRECT = 'auth/SET_REDIRECT',
  OTHER = '__other__',
}

export type TSetRedirect = {
  type: ActionTypeKeys.SET_REDIRECT
  redirectTo: string
}
export type TActionTypes = TSetRedirect | {type: ActionTypeKeys.OTHER}

export type TState = {
  /**
   * When set, the app will redirect to this route upon successful signin.
   * For example, if I try to access a protected dashboard route before
   * logging in, I'll first be directed to the /signin page, then once
   * I sign in successfully, it'll redirect me to the dashboard route I
   * originally requested.
   */
  redirectTo: null | string
}

const initialState: TState = {
  redirectTo: null,
}

export default (state = initialState, action: TActionTypes) => {
  switch (action.type) {
    case ActionTypeKeys.SET_REDIRECT:
      return {...state, redirectTo: action.redirectTo}

    default:
      return state
  }
}

export const actions = {
  setRedirect: (redirectTo: string) => {
    return (dispatch: Redux.Dispatch<TSetRedirect>) =>
      dispatch({
        type: ActionTypeKeys.SET_REDIRECT,
        redirectTo,
      }) as TSetRedirect
  },
}
