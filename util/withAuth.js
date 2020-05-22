import React from "react";
import cookies from "next-cookies";
import { USER_BY_TOKEN } from "../graphql/queries/users";
import { getUser } from "../redux/actions/auth";
/**
 * @param {React.Component} Component pass the component you need to check for authentication
 * @returns redirect if not authenticated
 */
// TODO
export const withAuth = (Component = React.Component) => {
  return class AuthComponent extends React.Component {
    static async getInitialProps({ ctx }) {
      const { token } = cookies(ctx);
      if (token) {
        const apolloClient = ctx.apolloClient;
        const userQuery = await apolloClient.query({
          query: USER_BY_TOKEN,
          variables: {
            token,
          },
        });
        ctx.store.dispatch(getUser(userQuery.data.userByToken));
        return { userQuery };
      }

      return {};
    }
    render() {
      return <Component {...this.props} />;
    }
  };
};
