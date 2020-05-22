import React from "react";
import cookies from "next-cookies";
import nookies, { parseCookies, setCookie, destroyCookie } from "nookies";

import { USER_BY_TOKEN } from "../graphql/queries/users";
import { getUser } from "../redux/actions/auth";
/**
 * @param {React.Component} Component pass the component you need to check for authentication
 * @returns redirect if not authenticated
 */
// TODO
export const checkAuth = (Component = React.Component) => {
  return class AuthComponent extends React.Component {
    static async getInitialProps(ctx) {
      const token = nookies.get(ctx).token;
      let query = null
      if (token) {
        const apolloClient = ctx.apolloClient;
        try {
          query = await apolloClient.query({
            query: USER_BY_TOKEN,
            variables: {
              token,
            },
          });
          ctx.store.dispatch(getUser(data.userByToken));
        } catch {
        //   nookies.destroy("token");
        }
        let pageProps = {};
        if (Component.getInitialProps) {
          pageProps = await Component.getInitialProps(ctx);
        }
        return { user:  'null', pageProps };
      }

      return {};
    }
    render() {
      return <Component test={this.props} user={this.props.user} {...this.props} />;
    }
  };
};
