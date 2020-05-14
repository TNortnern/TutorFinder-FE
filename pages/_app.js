import React from "react";
import App from "next/app";
import { ApolloProvider } from "@apollo/react-hooks";
import withRedux from "next-redux-wrapper";
import withData from "../util/apollo-client";
import { wrapper } from '../redux/store'
import '../styles/app.scss';

class MyApp extends App {
  render() {
    const { Component, pageProps, apollo } = this.props;
    return (
      <ApolloProvider client={apollo}>
        <Component {...pageProps} />
      </ApolloProvider>
    );
  }
}

// Wraps all components in the tree with the data provider
export default withData(wrapper.withRedux(App));
