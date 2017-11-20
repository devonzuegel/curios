import * as React from 'react'

type TProps = {children?: any; log?: boolean}

type TState = {hasError: boolean}

class ErrorBoundary extends React.Component<TProps, TState> {
  state = {hasError: false}

  componentDidCatch(error: any, info: any) {
    this.setState({hasError: true}) // Display fallback UI
    if (this.props.log) {
      console.log(error, info)
    }
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    }
    return this.props.children
  }
}

export default ErrorBoundary
