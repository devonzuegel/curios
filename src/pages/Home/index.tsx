import * as React from 'react'
import {connect} from 'react-redux'

import * as organization from '../../redux/reducers/organization'

type TProps = {organization: organization.TState}

const HomePage = (props: TProps) => (
  <div style={{maxWidth: '300px'}}>
    <h2>Home</h2>
    <pre>
      <h3>Redux store:</h3>
      {JSON.stringify(props, null, 2)}
    </pre>
  </div>
)

type TPartialGlobalState = {organization: organization.TState}

const mapStateToProps = (state: TPartialGlobalState) => state

export default connect(mapStateToProps)(HomePage)
