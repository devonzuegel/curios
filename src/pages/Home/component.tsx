import * as React from 'react'

import User from '~/components/User'
import Post from '~/components/Post'
import ErrorBoundary from '~/components/ErrorBoundary'
import CreatePost from './CreatePost'
import {TProps as TCreatePostProps} from './CreatePost'
import {TAllUsers, THomePageProps} from './types'

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

const PostsList = (props: TCreatePostProps) => {
  if (props.AllPosts.loading) {
    return <h3>...</h3>
  }
  return (
    <ErrorBoundary>
      <div
        style={{
          flexWrap: 'wrap',
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-around',
        }}
      >
        <CreatePost {...props} />
        {props.AllPosts.allPosts &&
          props.AllPosts.allPosts.map((post, k) => (
            <Post {...post} key={k} /> //
          ))}
      </div>
    </ErrorBoundary>
  )
}

export default (props: THomePageProps) => (
  <ErrorBoundary>
    <h2>Users</h2>
    <UsersList {...props.AllUsers} />
    <br />
    <h2>Posts</h2>
    <PostsList
      CreatePostMutation={props.CreatePostMutation}
      AllPosts={props.AllPosts}
    />
  </ErrorBoundary>
)
