import * as React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import Button from '../../components/Button'
import sitemap from '../../sitemap'
import * as organization from '../../redux/reducers/organization'

type TProps = {organization: organization.TState}

const HomePage = (props: TProps) => (
  <div style={{maxWidth: '300px'}}>
    <pre>organization = {JSON.stringify(props.organization, null, 2)}</pre>
    <h2>Home</h2>
    <Link to={sitemap.signup}>
      <Button stretch onClick={() => null}>
        Sign up
      </Button>
    </Link>
    <br />
    <Link to={sitemap.signin}>
      <Button stretch onClick={() => null}>
        Sign in
      </Button>
    </Link>
  </div>
)

type TPartialGlobalState = {organization: organization.TState}

const mapStateToProps = (state: TPartialGlobalState) => state

export default connect(mapStateToProps)(HomePage)
