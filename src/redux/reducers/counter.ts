import * as Redux from 'redux'

export const INCREMENT_REQUESTED = 'counter/INCREMENT_REQUESTED'
export const INCREMENT = 'counter/INCREMENT'
export const DECREMENT_REQUESTED = 'counter/DECREMENT_REQUESTED'
export const DECREMENT = 'counter/DECREMENT'

const initialState = {
  count: 0,
  isIncrementing: false,
  isDecrementing: false,
}

interface ICounterAction extends Redux.Action {}

export default (state = initialState, action: ICounterAction) => {
  switch (action.type) {
    case INCREMENT_REQUESTED:
      return {
        ...state,
        isIncrementing: true,
      }

    case INCREMENT:
      return {
        ...state,
        count: state.count + 1,
        isIncrementing: !state.isIncrementing,
      }

    case DECREMENT_REQUESTED:
      return {
        ...state,
        isDecrementing: true,
      }

    case DECREMENT:
      return {
        ...state,
        count: state.count - 1,
        isDecrementing: !state.isDecrementing,
      }

    default:
      return state
  }
}

export const increment = () => {
  return (dispatch: Redux.Dispatch<ICounterAction>) => {
    dispatch({
      type: INCREMENT_REQUESTED,
    })

    dispatch({
      type: INCREMENT,
    })
  }
}

export const incrementAsync = () => {
  return (dispatch: Redux.Dispatch<ICounterAction>) => {
    dispatch({
      type: INCREMENT_REQUESTED,
    })

    return setTimeout(() => {
      dispatch({
        type: INCREMENT,
      })
    }, 3000)
  }
}

export const decrement = () => {
  return (dispatch: Redux.Dispatch<ICounterAction>) => {
    dispatch({
      type: DECREMENT_REQUESTED,
    })

    dispatch({
      type: DECREMENT,
    })
  }
}

export const decrementAsync = () => {
  return (dispatch: Redux.Dispatch<ICounterAction>) => {
    dispatch({
      type: DECREMENT_REQUESTED,
    })

    return setTimeout(() => {
      dispatch({
        type: DECREMENT,
      })
    }, 3000)
  }
}
