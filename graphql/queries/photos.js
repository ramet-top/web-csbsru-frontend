import gql from 'graphql-tag'

// get all photos
export const QUERY_ALL_PHOTOS = gql`
  query PHOTOS {
    photos(sort: "createdAt:asc") {
      id
      title
      detail
      imageUrl {
        id
        url
      }
      createdAt
      updatedAt
    }
  }
`
