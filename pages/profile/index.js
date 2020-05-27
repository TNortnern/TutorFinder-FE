import React from "react";
import AppLayout from "../../components/layout/AppLayout";
import { AuthWrapper, checkAuth } from "../../util/checkAuth";
import Router from "next/router";
import { USERS_QUERY } from "../../graphql/queries/users";

const index = (props) => {
  return (
      <AppLayout>
        {JSON.stringify(props)}
        <div>Hello</div>
      </AppLayout>
  );
};

index.getInitialProps = async (ctx) => {
  // get users initially, probably something to move to _app.js
  const apolloClient = ctx.apolloClient;
  const { data, error, loading } = await apolloClient.query({
    query: USERS_QUERY,
  });
  // if (error) return <div>error</div>;
  return { data, error, loading };
};

export default checkAuth(index);
