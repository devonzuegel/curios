import * as Apollo from 'react-apollo'

import {TProps as TCreatePostProps} from './CreatePost'

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

export type TAllUsers = {allUsers: TUser[]} & Apollo.QueryProps
export type TAllPosts = {allPosts: TPost[]} & Apollo.QueryProps

export type THomePageProps = {
  AllUsers: TAllUsers
  AllPosts: TAllPosts
} & TCreatePostProps
