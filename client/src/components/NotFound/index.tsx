import * as React from 'react'

const styles = require('./styles.css')

class NotFound extends React.Component {
  render() {
    return (
      <div className={styles['not-found-container']}>
        <div className={styles['center-text']}>
          <h1>404</h1>
          <p>Page not found</p>

          <a href="/" className={styles['home-btn']}>
            Let's go home
          </a>
        </div>
      </div>
    )
  }
}

export default NotFound
