import * as React from 'react'
import {Switch} from 'react-router-dom'
import {ConnectedRouter, RouterState} from 'react-router-redux'
import {connect} from 'react-redux'

import {history} from '@client/redux/store'
import * as Route from '@client/components/Route'
import Dashboard from '@client/pages/Dashboard'
import NotFound from '@client/components/NotFound'
import sitemap from '@client/sitemap'

const Pages = (props: {routing: RouterState}) => (
  <ConnectedRouter history={history}>
    <main>
      {/* Render only the first-matched component */}
      <Switch>
        <Route.Simple exact path={sitemap.home} component={Dashboard} />

        {/* 404 */}
        <Route.Simple component={NotFound} />
      </Switch>
    </main>
  </ConnectedRouter>
)

export default connect((store: {routing: RouterState}) => store)(Pages)
