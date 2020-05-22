import gql from "graphql-tag";

export const USERS_QUERY = gql`
  query users {
    users {
      id
      name
      profile {
        avatar
        categories {
          name
        }
      }
      role {
        name
      }
    }
  }
`;

export const LOGIN = gql`
  query($email: String!, $password: String!) {
    login(user: { email: $email, password: $password }) {
      token
      user {
        id
        name
        email
        role {
          name
        }
        profile {
          avatar
        }
      }
    }
  }
`;

export const USER_BY_TOKEN = gql`
  query($token: String) {
    userByToken(token: $token) {
      id
      name
      email
      role {
        name
      }
      profile {
        avatar
      }
    }
  }
`;
