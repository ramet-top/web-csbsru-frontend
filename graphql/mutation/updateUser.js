import gql from "graphql-tag";

//update userAuth
export const MUTATION_UPDATE_USER = gql`
  mutation {
    updateUser(
      input: {
        where: { id: "5dd67741210bea8a891d8f82" }
        data: { firstName: "top" }
      }
    ) {
      user {
        id
        email
        username
        role {
          name
        }
        firstName
        lastName
        birthDate
        imageUrl {
          url
        }
        tel
        gender
        status_Study
      }
    }
  }
`;
