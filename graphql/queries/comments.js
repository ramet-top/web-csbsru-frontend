// get the comments by _id
export const QUERY_SINGLE_PROJECT = gql`
  query PROJECT($id: ID!) {
    project(id: $id) {
      id
      detail
      user {
        id
        firstName
        lastName
        imageUrl {
          id
          url
        }
      }
      createdAt
      updatedAt
    }
  }
`
