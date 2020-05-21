import gql from "graphql-tag";

export const CATEGORIES_QUERY = gql`
  query {
    publicCategories {
      id
      name
    }
  }
`;
