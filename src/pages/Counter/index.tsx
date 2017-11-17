import * as React from 'react'
import {push} from 'react-router-redux'
import * as Redux from 'redux'
import {connect} from 'react-redux'

import * as counterReducer from '../../redux/reducers/counter'
import sitemap from '../../sitemap'
import Button from '../../components/Button'

const Home = (props: {
  count: number
  isIncrementing: boolean
  isDecrementing: boolean
  incrementAsync: (event: React.MouseEvent<HTMLButtonElement>) => void
  decrementAsync: (event: React.MouseEvent<HTMLButtonElement>) => void
  increment: (event: React.MouseEvent<HTMLButtonElement>) => void
  decrement: (event: React.MouseEvent<HTMLButtonElement>) => void
  goHome: Function
}) => (
  <div>
    <p>This is just a toy example of a route hooked up to the Redux store. :)</p>

    <h2>Count: {props.count}</h2>

    <p>
      <Button onClick={props.increment} disabled={props.isIncrementing}>
        Increment
      </Button>
      <Button onClick={props.incrementAsync} disabled={props.isIncrementing}>
        Increment Async
      </Button>
    </p>

    <p>
      <Button onClick={props.decrement} disabled={props.isDecrementing}>
        Decrementing
      </Button>
      <Button onClick={props.decrementAsync} disabled={props.isDecrementing}>
        Decrement Async
      </Button>
    </p>

    <p>
      <Button onClick={() => props.goHome()}>Go to Home page via Redux</Button>
    </p>
  </div>
)

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
