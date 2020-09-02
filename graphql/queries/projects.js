import gql from 'graphql-tag'
// get all porject
export const QUERY_ALL_PROJECTS = gql`
  query {
    projects {
      id
      title
      status
      pro_ad
      user {
        id
        username
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

// get all porject
export const QUERY_ALL_PROJECTS_CONFIRM = gql`
  query PROJECTS($where: JSON) {
    projects(where: $where) {
      id
      title
      status
      pro_ad
      confirm
      finalDate
      finalTime
      user {
        id
        username
        prefix
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

// get the project by _id
export const QUERY_SINGLE_PROJECT = gql`
  query PROJECT($id: ID!) {
    project(id: $id) {
      id
      title
      detail
      pro_ad
      status
      confirm
      finalDate
      finalTime
      user {
        id
        username
        prefix
        firstName
        lastName
        imageUrl {
          id
          url
        }
      }
      fileUrl {
        id
        name
        url
        size
      }
      fileFull {
        id
        name
        url
        size
      }
      comments {
        id
        detail
        user {
          id
          prefix
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
      scores {
        id
        status
        user {
          id
          username
        }
      }
      createdAt
      updatedAt
    }
  }
`

// get the project by _id
export const QUERY_SINGLE_PROJECT_FOR_COMMENTS = gql`
  query PROJECT($id: ID!) {
    project(id: $id) {
      id
      title
      user {
        username
        prefix
        firstName
        lastName
        imageUrl {
          id
          url
        }
      }
      comments {
        id
        detail
        user {
          id
          prefix
          firstName
          lastName
          imageUrl {
            id
            url
          }
        }
      }
      fileUrl {
        id
        url
      }
      fileFull {
        id
        name
        url
        size
      }
    }
  }
`

// get all porject status success
export const QUERY_ALL_PROJECTS_SUCCESS = gql`
  query PROJECTS($where: JSON) {
    projects(where: $where) {
      id
      title
      status
      pro_ad
      user {
        id
        username
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
