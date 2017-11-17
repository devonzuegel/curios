import * as React from 'react'
import * as Redux from 'redux'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import sitemap from '../../../sitemap'
import * as auth from '../../../redux/reducers/auth'
import DotDotDot from '../../../components/DotDotDot'

type TProps = {
  signout: () => (d: Redux.Dispatch<auth.TActionTypes>) => auth.TActionTypes
}

type TState = {loading: boolean}

class Signout extends React.Component<TProps, TState> {
  state = {loading: true}
  timer?: NodeJS.Timer | number // Handle WebWorker timer

  componentDidMount() {
    this.props.signout()
    const nextPage = () => this.setState({loading: false})
    this.timer = setInterval(nextPage, 1500)
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer as NodeJS.Timer)
    }
  }

  render() {
    if (this.state.loading) {
      return <DotDotDot>Logging out</DotDotDot>
    }
    return <Redirect to={{pathname: sitemap.home}} />
  }
}

const mapDispatchToProps = () => (dispatch: Redux.Dispatch<Redux.Action>) =>
  Redux.bindActionCreators({signout: auth.actions.signout}, dispatch)

export default connect(() => ({}), mapDispatchToProps)(Signout)
