import * as React from 'react'

import User from '~/components/User'
import Post from '~/components/Post'

export type TUser = {
  id: string
  facebookUserId: string
  facebookFirstName: string
  __typename: 'User'
}

export type TPost = {
  id: string
  imageUrl: string
  description: string
  __typename: 'Post'
}

export type TAllUsers = {
  allUsers: TUser[]
  loading: boolean
}

export type TAllPosts = {
  allPosts: TPost[]
  loading: boolean
}

export type TProps = {
  AllUsers: TAllUsers
  AllPosts: TAllPosts
}

const UsersList = (props: TAllUsers) => {
  if (props.loading) {
    return <h3>...</h3>
  }
  return (
    <div>
      {props.allUsers &&
        props.allUsers.map(
          (user, k) => <User {...user} key={k} /> //
        )}
    </div>
  )
}

const PostsList = (props: TAllPosts) => {
  if (props.loading) {
    return <h3>...</h3>
  }
  return (
    <div>
      <div
        style={{
          flexWrap: 'wrap',
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
        }}
      >
        {props.allPosts &&
          props.allPosts.map((post, k) => <Post {...post} key={k} />) //
        }
      </div>
    </div>
  )
}

class ErrorBoundary extends React.Component<{children?: any}, {hasError: boolean}> {
  constructor(props: any) {
    super(props)
    this.state = {hasError: false}
  }

  componentDidCatch(error: any, info: any) {
    // Display fallback UI
    this.setState({hasError: true})
    // You can also log the error to an error reporting service
    console.log(error, info)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>
    }
    return this.props.children
  }
}

export default (props: TProps) => (
  <ErrorBoundary>
    <h2>Users</h2>
    <UsersList {...props.AllUsers} />
    <br />
    <h2>Posts</h2>
    <PostsList {...props.AllPosts} />
  </ErrorBoundary>
)
