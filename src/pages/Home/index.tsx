import * as React from 'react'
import {connect} from 'react-redux'

const HomePage = (props: {}) => (
  <div style={{maxWidth: '300px'}}>
    <h2>Home</h2>
    <pre>
      <h3>Redux store:</h3>
      {JSON.stringify(props, null, 2)}
    </pre>
  </div>
)

const mapStateToProps = (state: {}) => state

export default connect(mapStateToProps)(HomePage)
