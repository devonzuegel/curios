import * as React from 'react'
import {Link, Switch} from 'react-router-dom'
import {ConnectedRouter} from 'react-router-redux'

import {history} from '../redux/store'
import Wrapper from '../components/Wrapper'
import * as Route from '../components/Route'
import Counter from '../pages/Counter'
import Home from '../pages/Home'
import FbAuth from '../pages/Authentication/Facebook'
import Users from '../pages/Users'
import NotFound from '../pages/NotFound'
import sitemap from '../sitemap'

const styles = require('./index.css')

const App = () => (
  <ConnectedRouter history={history}>
    <div className={styles.app}>
      <Wrapper>
        <header className={styles.header}>
          <Link to={sitemap.home}>Home</Link>
          <Link to={sitemap.users}>Users</Link>
          <Link to={sitemap.counter}>Counter</Link>
          <div style={{float: 'right'}}>
            <FbAuth />
          </div>
        </header>

        <main>
          {/* Render only the first-matched component */}
          <Switch>
            <Route.Simple exact path={sitemap.users} component={Users} />
            <Route.Simple exact path={sitemap.home} component={Home} />
            <Route.SignedIn path={sitemap.counter} component={Counter} />

            {/* 404 */}
            <Route.Simple component={NotFound} />
          </Switch>
        </main>
      </Wrapper>
    </div>
  </ConnectedRouter>
)

export default App
