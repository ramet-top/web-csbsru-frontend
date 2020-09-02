import gql from 'graphql-tag'
// get all news
export const QUERY_ALL_POSTS = gql`
  query POSTS($where: JSON) {
    posts(where: $where, sort: "createdAt:desc") {
      id
      title
      detail
      imageUrl {
        id
        url
      }
      user {
        imageUrl {
          url
        }
        firstName
        lastName
      }
      publish
      category
      createdAt
      updatedAt
    }
  }
`
// all post with me
export const QUERY_ALL_POSTS_OF_ME = gql`
  query POSTS($where: JSON) {
    posts(where: $where, sort: "createdAt:desc") {
      id
      title
      detail
      publish
      imageUrl {
        id
        url
      }
      user {
        imageUrl {
          url
        }
        firstName
        lastName
      }
      category
      createdAt
      updatedAt
    }
  }
`

// get the news by _id
export const QUERY_SINGLE_POST = gql`
  query POST($id: ID!) {
    post(id: $id) {
      id
      title
      detail
      imageUrl {
        id
        url
      }
      user {
        prefix
        firstName
        lastName
      }
      category
      publish
      createdAt
      updatedAt
    }
  }
`
