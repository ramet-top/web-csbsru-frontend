import gql from 'graphql-tag'
// get all news
export const QUERY_ALL_ADVISORS = gql`
  query {
    advisors {
      id
      nameTH
      nameEN
      email
      position
      education
      imageUrl {
        url
      }
      phone_one
      phone_two
      createdAt
      updatedAt
    }
  }
`

// get the news by _id

export const QUERY_SINGLE_ADVISOR = gql`
  query advisor($id: ID!) {
    advisor(id: $id) {
      id
      nameTH
      nameEN
      email
      position
      education
      imageUrl {
        url
      }
      phone_one
      phone_two
      createdAt
      updatedAt
    }
  }
`
