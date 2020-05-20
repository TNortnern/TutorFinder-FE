import gql from "graphql-tag";

export const USERS_QUERY = gql`
  query users {
    users {
      id
      name
      profile {
        avatar
      }
      role {
        name
      }
    }
  }
`;
