import * as React from 'react'

const styles = require('./index.css')

export default (props: {children: string}) => (
  <h2 className={styles.loading}>{props.children}</h2>
)
