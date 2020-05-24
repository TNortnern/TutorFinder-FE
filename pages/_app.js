import React from "react";
import App, { Container } from "next/app";
import { ApolloProvider } from "@apollo/react-hooks";
import withRedux from "next-redux-wrapper";
import withData from "../util/apollo-client";
import { wrapper } from "../redux/store";
import "../styles/app.scss";
import UserContext from "../components/UserContext";
import ContextDevTool from "react-context-devtool";
import nookies from "nookies";
import { USER_BY_TOKEN } from "../graphql/queries/users";
import { getUser } from "../redux/actions/auth";

class MyApp extends App {
  state = {
    user: null,
  };
  static async getInitialProps(req) {
    // check if user is authenticated, if so, update global context
    const { ctx } = req;
    const token = nookies.get(ctx).token;
    let qry = null;
    let pageProps = {};
    // init props if they exist
    if (App.getInitialProps) {
      pageProps = await App.getInitialProps(req);
    }
    if (token) {
      const apolloClient = ctx.apolloClient;
      qry = await apolloClient.query({
        query: USER_BY_TOKEN,
        variables: {
          token,
        },
      });
      ctx.store.dispatch(getUser(qry.data.userByToken));
      return { ssrUser: qry.data.userByToken, pageProps };
    }

    return { user: null, pageProps };
  }

  componentDidMount() {
    // setting local state to the user fetched from ssr if it exists
    if (this.props.ssrUser) {
      this.setState({ user: this.props.ssrUser });
    }
  }
  logout = () => {
    this.setState({ user: null });
  };
  signin = (user) => {
    this.setState({ user });
  };
  render() {
    const { Component, pageProps, apollo, ssrUser } = this.props;
    return (
      <ApolloProvider client={apollo}>
        <UserContext.Provider
          value={{
            user: this.state.user,
            logout: this.logout,
            signin: this.signin,
          }}
        >
          <ContextDevTool
            context={UserContext}
            id="uniqContextId"
            displayName="Context Display Name"
          />

          <Component {...pageProps} />
        </UserContext.Provider>
      </ApolloProvider>
    );
  }
}
// Wraps all components in the tree with the data provider
export default withData(wrapper.withRedux(MyApp));
