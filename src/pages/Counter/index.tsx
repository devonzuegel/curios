import {push} from 'react-router-redux'
import * as Redux from 'redux'
import {connect} from 'react-redux'

import Home from './component'
import * as counterReducer from '~/redux/reducers/counter'
import sitemap from '~/sitemap'

type TPartialGlobalState = {
  counter: {
    count: number
    isIncrementing: boolean
    isDecrementing: boolean
  }
}

const mapStateToProps = (state: TPartialGlobalState) => ({
  count: state.counter.count,
  isIncrementing: state.counter.isIncrementing,
  isDecrementing: state.counter.isDecrementing,
})

const mapDispatchToProps = (dispatch: Redux.Dispatch<Redux.Action>) =>
  Redux.bindActionCreators(
    {
      increment: counterReducer.increment,
      incrementAsync: counterReducer.incrementAsync,
      decrement: counterReducer.decrement,
      decrementAsync: counterReducer.decrementAsync,
      goHome: () => push(sitemap.home),
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Home)
