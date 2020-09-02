import gql from 'graphql-tag'
// get me auth
export const QUERY_USER_AUTH = gql`
  query USER($id: ID!) {
    user(id: $id) {
      id
      email
      username
      prefix
      # gender
      firstName
      lastName
      imageUrl {
        url
      }
      tel
      lineID
      facebook
      parents
      addr
      status_Study
    }
  }
`

// get all porject report and dashboard
export const QUERY_ALL_USERS = gql`
  query USERS($where: JSON) {
    users(where: $where) {
      id
      email
      username
      prefix
      firstName
      lastName
      role {
        name
      }
      imageUrl {
        url
      }
      tel
      # gender
    }
  }
`

// get one porject report and dashboard
export const QUERY_SINGLE_USER = gql`
  query USER($where: JSON) {
    user(where: $where) {
      id
      email
      username
      prefix
      firstName
      lastName
      role {
        name
      }
      imageUrl {
        url
      }
      tel
      # gender
    }
  }
`
