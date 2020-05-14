import gql from "graphql-tag";

const PRODUCTS_QUERY = gql`
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

export default PRODUCTS_QUERY;
