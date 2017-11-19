import * as React from 'react'

import User from '~/components/User'
import Post from '~/components/Post'
import ErrorBoundary from '~/components/ErrorBoundary'

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
    <ErrorBoundary>
      {props.allUsers &&
        props.allUsers.map(
          (user, k) => <User {...user} key={k} /> //
        )}
    </ErrorBoundary>
  )
}

const PostsList = (props: TAllPosts) => {
  if (props.loading) {
    return <h3>...</h3>
  }
  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  )
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
