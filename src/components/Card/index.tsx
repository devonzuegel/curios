import * as React from 'react'

const styles = require('./index.css')

type TProps = {
  children: JSX.Element | JSX.Element[]
}

const Card = (props: TProps) => <div className={styles.card}>{props.children}</div>

export default Card
