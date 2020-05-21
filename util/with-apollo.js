import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { withApollo } from "next-apollo";
import { createHttpLink } from "apollo-link-http";
import fetch from "isomorphic-unfetch";

const GRAPHQL_URL = "https://tutor-app-be.herokuapp.com/graphql";

const link = createHttpLink({
  fetch, // Switches between unfetch & node-fetch for client & server.
  uri: GRAPHQL_URL,
});


const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default withApollo(apolloClient);
