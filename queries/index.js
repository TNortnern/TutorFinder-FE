import gql from "graphql-tag";

const PROJECTS_QUERY = gql`
  query products {
    products {
      id
      name
      category {
        name
      }
    }
  }
`;

export default PROJECTS_QUERY;
