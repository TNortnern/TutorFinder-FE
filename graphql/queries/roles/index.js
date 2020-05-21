import gql from "graphql-tag";

export const ROLES_QUERY = gql`
  query {
    roles {
      id
      name
    }
  }
`;
