import gql from "graphql-tag";

export const CREATE_USER = gql`
  mutation($name: String,
      $email: String,
      $password: String,
      $location: String,
      $avatar: String,
      $role: String,
      $categories: [String]) {
    createUser(user: {
        name: $name,
        email: $email,
        password: $password,
        location: $location,
        avatar: $avatar,
        role: $role,
        categories: $categories
    }) {
      user {
        id
        email
        name
      }
      token
      id
    }
  }
`;
