import gql from 'graphql-tag'

// get all Researches
export const QUERY_ALL_PROFESSOR_RESEARCHES = gql`
  query RESEARCHES {
    professorResearches(sort: "createdAt:asc") {
      id
      name
      title
      detail
      file {
        id
        url
      }
      createdAt
      updatedAt
    }
  }
`

export const QUERY_SINGLE_PROFESSOR_RESEARCH = gql`
  query RESEARCH($id: ID!) {
    professorResearch(id: $id) {
      id
      name
      title
      detail
      file {
        id
        url
      }
      createdAt
      updatedAt
    }
  }
`
