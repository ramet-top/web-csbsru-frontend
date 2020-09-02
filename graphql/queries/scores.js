import gql from 'graphql-tag'

// get all porject where scores match userID and projectId
export const QUERY_WHERE_USERID_AND_PROJECTID = gql`
  query SCORES($where: JSON) {
    scores(where: $where) {
      id
      status
      user {
        id
        username
      }
      createdAt
      updatedAt
    }
  }
`

// get all porject where scores match userID and projectId
export const QUERY_WHERE_SINGLE_SCORE = gql`
  query SCORE($where: JSON) {
    score(where: $where) {
      id
      status
      user {
        id
        username
      }
      createdAt
      updatedAt
    }
  }
`
