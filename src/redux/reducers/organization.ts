import * as Redux from 'redux'

export enum ActionTypeKeys {
  CREATE = 'organization/CREATE',
  CLEAR = 'organization/CLEAR',
  OTHER = '__other__',
}

export type TCreate = {orgName: string; type: ActionTypeKeys.CREATE}
export type TClear = {orgName: string; type: ActionTypeKeys.CLEAR}
export type TActionTypes = TCreate | TClear | {type: ActionTypeKeys.OTHER}

export type TState = {name?: string}

const initialState: TState = {name: undefined}

export default (state = initialState, action: TActionTypes) => {
  switch (action.type) {
    case ActionTypeKeys.CREATE:
      // TODO: dispatch organization creation
      return {name: action.orgName}

    case ActionTypeKeys.CLEAR:
      return {name: undefined}

    default:
      return state
  }
}

export const actions = {
  create: (orgName: string) => (dispatch: Redux.Dispatch<TCreate>) => {
    return dispatch({type: ActionTypeKeys.CREATE, orgName}) as TCreate
  },

  clear: () => (dispatch: Redux.Dispatch<TCreate>) => {
    return dispatch({type: ActionTypeKeys.CLEAR}) as TClear
  },
}
