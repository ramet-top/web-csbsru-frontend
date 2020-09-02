import gql from 'graphql-tag'
// get all news
export const QUERY_ALL_ACTIVITIES = gql`
  query {
    activities(sort: "createdAt:desc") {
      id
      title
      detail
      imageUrl {
        id
        url
      }
      user {
        firstName
      }
      createdAt
      updatedAt
    }
  }
`

// get the activity by _id
export const QUERY_SINGLE_ACTIVITY = gql`
  query ACTIVITY($id: ID!) {
    activity(id: $id) {
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
      album {
        id
        url
      }
      createdAt
      updatedAt
    }
  }
`
